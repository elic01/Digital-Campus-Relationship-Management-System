function showForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.tab-btn');
    
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
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
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Login form handler
async function handleLogin(e) {
    e.preventDefault();
    FormValidator.clearErrors();

    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const role = e.target.querySelector('select[name="role"]').value;

    const emailValidation = FormValidator.validateEmail(email);
    if (!emailValidation.isValid) {
        FormValidator.showError(e.target.querySelector('input[type="email"]'), emailValidation.message);
        return;
    }

    try {
        const response = await loginUser({ email, password, role });
        if (response.success) {
            window.location.href = '/dashboard.html';
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Signup form handler
async function handleSignup(e) {
    e.preventDefault();
    FormValidator.clearErrors();

    const formData = {
        fullName: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        password: e.target.querySelector('input[type="password"]').value,
        confirmPassword: e.target.querySelectorAll('input[type="password"]')[1].value,
        role: e.target.querySelector('select[name="role"]').value
    };

    // Validate all fields
    if (!formData.fullName.trim()) {
        FormValidator.showError(e.target.querySelector('input[type="text"]'), 'Full name is required');
        return;
    }

    const emailValidation = FormValidator.validateEmail(formData.email);
    if (!emailValidation.isValid) {
        FormValidator.showError(e.target.querySelector('input[type="email"]'), emailValidation.message);
        return;
    }

    const passwordValidation = FormValidator.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
        FormValidator.showError(e.target.querySelector('input[type="password"]'), passwordValidation.message);
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        FormValidator.showError(e.target.querySelectorAll('input[type="password"]')[1], 'Passwords do not match');
        return;
    }

    try {
        const response = await registerUser(formData);
        if (response.success) {
            showNotification('Registration successful! Please verify your email.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

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
// Form switching functionality
function showForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.tab-btn');
  
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Initialize IndexedDB with encryption and persistence
let db;
const dbName = "DCRMS_DB";
const dbVersion = 2; // Increment version for schema updates
const request = indexedDB.open(dbName, dbVersion);

// Hash function using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

request.onerror = (event) => {
    console.log("Database error:", event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'email' });
        userStore.createIndex('role', 'role', { unique: false });
        userStore.createIndex('lastLogin', 'lastLogin', { unique: false });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    // Enable persistence
    db.onversionchange = () => {
        db.close();
        alert("Database is outdated, please reload the page.");
    };
};

// Enhanced signup handler with hashing
document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const userData = Object.fromEntries(formData);
    
    if (userData.password !== userData.confirmPassword) {
        showMessage('signup-message', "Passwords don't match!", 'error');
        return;
    }

    try {
        const hashedPassword = await hashPassword(userData.password);
        const transaction = db.transaction(['users'], 'readwrite');
        const userStore = transaction.objectStore('users');

        const user = {
            email: userData.email,
            fullName: userData.fullName,
            password: hashedPassword,
            role: userData.role,
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        const addRequest = userStore.add(user);

        addRequest.onsuccess = () => {
            showMessage('signup-message', 'Account created successfully!', 'success');
            this.reset();
            setTimeout(() => showForm('login'), 1500);
        };

        addRequest.onerror = () => {
            showMessage('signup-message', 'Email already exists!', 'error');
        };
    } catch (error) {
        showMessage('signup-message', 'Registration failed!', 'error');
    }
});

// Enhanced login handler with hash verification
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const loginData = Object.fromEntries(formData);

    try {
        const hashedPassword = await hashPassword(loginData.password);
        const transaction = db.transaction(['users'], 'readwrite');
        const userStore = transaction.objectStore('users');
        const request = userStore.get(loginData.email);

        request.onsuccess = () => {
            const user = request.result;
            if (user && user.password === hashedPassword && user.role === loginData.role) {
                // Update last login
                user.lastLogin = new Date().toISOString();
                userStore.put(user);

                showMessage('login-message', 'Login successful!', 'success');
                sessionStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                    lastLogin: user.lastLogin
                }));

                const dashboardRoutes = {
                    'student': '../dashboard/student-dashboard.html',
                    'lecturer': '../dashboard/lecturer-dashboard.html',
                    'admin': '../dashboard/admin-dashboard.html'
                };

                setTimeout(() => {
                    window.location.href = dashboardRoutes[user.role];
                }, 1000);
            } else {
                showMessage('login-message', 'Invalid credentials!', 'error');
            }
        };
    } catch (error) {
        showMessage('login-message', 'Login failed!', 'error');
    }
});

// Helper function for messages
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
      'student': '../dashboard/student-dashboard.html',
      'lecturer': '../dashboard/lecturer-dashboard.html',
      'admin': '../dashboard/admin-dashboard.html'
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
