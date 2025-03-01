function showForm(formType) {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.querySelector('[onclick="showForm(\'login\')"]');
    const signupTab = document.querySelector('[onclick="showForm(\'signup\')"]');

    // Clear any existing error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.message').forEach(msg => msg.style.display = 'none');

    if (formType === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
        
        // Reset signup form
        signupForm.reset();
        
        // Reset password strength meter if exists
        const strengthMeter = document.querySelector('.password-strength-meter');
        if (strengthMeter) {
            strengthMeter.style.background = '#eee';
        }
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        signupTab.classList.remove('active');
        loginTab.classList.add('active');
        
        // Reset login form
        loginForm.reset();
    }
}
// Form validation and error handling
class FormValidator {
    static showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
        element.classList.add('error');
    }

    static clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(element => element.classList.remove('error'));
    }

    static validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
            message: 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
        };
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            isValid: emailRegex.test(email),
            message: 'Please enter a valid email address'
        };
    }
}

// Event listeners for forms
document.addEventListener('DOMContentLoaded', () => {
    // Form switching
    window.showForm = (formType) => {
        document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(`${formType}-form`).classList.remove('hidden');
        document.querySelector(`[onclick="showForm('${formType}')"]`).classList.add('active');
    };

    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const passwordInput = e.target.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            e.target.classList.toggle('fa-eye');
            e.target.classList.toggle('fa-eye-slash');
        });
    });

    // Password strength meter
    const checkPasswordStrength = (password) => {
        let strength = 0;
        const meters = {
            hasLower: /[a-z]/,
            hasUpper: /[A-Z]/,
            hasNumber: /\d/,
            hasSpecial: /[^A-Za-z0-9]/,
            isLong: /.{8,}/
        };

        Object.values(meters).forEach(regex => {
            if (regex.test(password)) strength++;
        });

        const meter = document.querySelector('.password-strength-meter');
        const colors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#27ae60'];
        meter.style.background = `linear-gradient(to right, ${colors[strength-1]} ${strength*20}%, #eee ${strength*20}%)`;
    };

    document.querySelector('input[name="password"]').addEventListener('input', (e) => {
        checkPasswordStrength(e.target.value);
    });

    // Form validation
    const validateForm = (form) => {
        let isValid = true;
        form.querySelectorAll('input, select').forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, 'Please enter a valid email');
                    isValid = false;
                }
            } else if (input.name === 'password' && input.value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(input.value)) {
                    showError(input, 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character');
                    isValid = false;
                }
            } else if (input.name === 'confirmPassword' && input.value) {
                const password = form.querySelector('input[name="password"]').value;
                if (input.value !== password) {
                    showError(input, 'Passwords do not match');
                    isValid = false;
                }
            }
        });
        return isValid;
    };

    const showError = (input, message) => {
        const errorSpan = input.parentElement.querySelector('.error-message');
        errorSpan.textContent = message;
        input.style.borderColor = 'var(--error-color)';
    };

    // Form submission
    document.querySelectorAll('.auth-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm(form)) return;

            const submitBtn = form.querySelector('button[type="submit"]');
            const spinner = submitBtn.querySelector('.fa-spinner');
            submitBtn.disabled = true;
            spinner.classList.remove('hidden');

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Replace with your actual API endpoint
                const response = await fetch('/api/auth/' + form.id.replace('-form', ''), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (response.ok) {
                    window.location.href = '/dashboard';
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                const messageDiv = form.querySelector('.message');
                messageDiv.textContent = error.message;
                messageDiv.style.color = 'var(--error-color)';
            } finally {
                submitBtn.disabled = false;
                spinner.classList.add('hidden');
            }
        });
    });
});

// Password reset functionality
async function sendResetLink() {
    FormValidator.clearErrors();
    const email = document.getElementById('reset-email').value;
    
    const emailValidation = FormValidator.validateEmail(email);
    if (!emailValidation.isValid) {
        FormValidator.showError(document.getElementById('reset-email'), emailValidation.message);
        return;
    }

    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('step-2').classList.remove('hidden');
            showNotification('Reset code sent to your email', 'success');
        }
    } catch (error) {
        showNotification('Failed to send reset code', 'error');
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
function showForm(formType) {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.querySelector('[onclick="showForm(\'login\')"]');
    const signupTab = document.querySelector('[onclick="showForm(\'signup\')"]');

    if (formType === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        signupTab.classList.remove('active');
        loginTab.classList.add('active');
    }
}

// Initialize the forms on page load
document.addEventListener('DOMContentLoaded', () => {
    showForm('login'); // Set default view to login
});

// Initialize IndexedDB
const dbName = "DCRMS_DB";
const dbVersion = 1;
const request = indexedDB.open(dbName, dbVersion);

let db;

request.onerror = (event) => {
    console.log("Database error:", event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'email' });
        userStore.createIndex('role', 'role', { unique: false });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    initializeTestData(); // Initialize test users
};

// Hash function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Login handler
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[name="email"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const role = this.querySelector('select[name="role"]').value;

    try {
        const hashedPassword = await hashPassword(password);
        const transaction = db.transaction(['users'], 'readonly');
        const userStore = transaction.objectStore('users');
        const user = await userStore.get(email);

        if (user && user.password === hashedPassword && user.role === role) {
            // Store session
            sessionStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }));

            // Redirect based on role
            const dashboards = {
                'student': '../student/Studentdashboard.html',
                'lecturer': '../lecturer/LecturerDashboard.html',
                'admin': '../admin/Admindashboard.html'
            };
            
            window.location.href = dashboards[role];
        } else {
            showMessage('login-message', 'Invalid credentials!', 'error');
        }
    } catch (error) {
        showMessage('login-message', 'Login failed!', 'error');
    }
});

// Initialize test data
async function initializeTestData() {
    const testUsers = [
        {
            email: 'h230393f@hit.ac.zw',
            fullName: 'Emmanuel L I Chinjekure',
            password: await hashPassword('userpass123'),
            role: 'student'
        },
        {
            email: 'isheanesu2004@gmail.com',
            fullName: 'Mr Sumbureru', 
            password: await hashPassword('qwerty123'),
            role: 'lecturer'
        },
        {
            email: 'admin@hit.ac.zw',
            fullName: 'admin',
            password: await hashPassword('Admin123'),
            role: 'admin'
        }
    ];

    const transaction = db.transaction(['users'], 'readwrite');
    const userStore = transaction.objectStore('users');

    for (const user of testUsers) {
        userStore.put(user);
    }
}

function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
}
// Add these functions after your existing script

// Google OAuth Configuration
function initializeGoogleAuth() {
const googleBtn = document.querySelector('.google-btn');
googleBtn.addEventListener('click', async () => {
const clientId = 'YOUR_GOOGLE_CLIENT_ID';
const redirectUri = window.location.origin + '/auth/google-callback';

const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
  client_id=${clientId}&
  redirect_uri=${redirectUri}&
  response_type=code&
  scope=email profile&
  prompt=select_account`;
  
window.location.href = googleAuthUrl;
});
}

// University Login Configuration
function initializeUniversityAuth() {
const universityBtn = document.querySelector('.university-btn');
universityBtn.addEventListener('click', async () => {
const universityAuthUrl = 'https://your-university-sso-url/auth';
const clientId = 'YOUR_UNIVERSITY_CLIENT_ID';

const ssoUrl = `${universityAuthUrl}?
  client_id=${clientId}&
  redirect_uri=${window.location.origin}/auth/university-callback&
  response_type=code`;
  
window.location.href = ssoUrl;
});
}

// Handle OAuth callbacks
async function handleAuthCallback(provider, code) {
try {
const response = await fetch(`/api/auth/${provider}`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ code })
});

const userData = await response.json();

if (userData.success) {
  // Store user in IndexedDB
  const transaction = db.transaction(['users'], 'readwrite');
  const userStore = transaction.objectStore('users');
  
  await userStore.put({
      email: userData.email,
      fullName: userData.name,
      role: userData.role,
      authProvider: provider,
      lastLogin: new Date().toISOString()
  });

  // Redirect to appropriate dashboard
  const dashboardRoutes = {
      'student': '../student/Studentdashboard.html',
      'lecturer': '../lecturer/LecturerDashboard.html.html',
      'admin': '../admin/Admindashboard.html'
  };

  window.location.href = dashboardRoutes[userData.role];
}
} catch (error) {
showMessage('login-message', `${provider} login failed!`, 'error');
}
}

// Initialize auth providers
document.addEventListener('DOMContentLoaded', () => {
initializeGoogleAuth();
initializeUniversityAuth();
});

const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('.auth-box').appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});
        // Initialize particles.js
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
// Add input focus effects
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('.primary-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = 'Success <i class="fas fa-check"></i>';
            button.style.background = 'var(--success-color)';
        }, 1500);
    });
});

// Enhance password strength indicator
const passwordInput = document.querySelector('input[type="password"]');
const strengthMeter = document.querySelector('.password-strength-meter');

passwordInput.addEventListener('input', () => {
    const strength = calculatePasswordStrength(passwordInput.value);
    updateStrengthMeter(strength);
});
