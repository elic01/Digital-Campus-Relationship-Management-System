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