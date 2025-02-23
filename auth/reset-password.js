document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-password-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    
    function sendResetLink() {
        FormValidator.clearErrors();
        const email = document.getElementById('reset-email').value;
        const emailValidation = FormValidator.validateEmail(email);
        
        if (!emailValidation.isValid) {
            FormValidator.showError(document.getElementById('reset-email'), emailValidation.message);
            return;
        }
        
        // Here you would make an API call to send reset code
        // For now, we'll just show step 2
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
    }
    
    function resetPassword() {
        FormValidator.clearErrors();
        const code = document.getElementById('reset-code').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        const passwordValidation = FormValidator.validatePassword(newPassword);
        
        if (!passwordValidation.isValid) {
            FormValidator.showError(document.getElementById('new-password'), passwordValidation.message);
            return;
        }
        
        if (newPassword !== confirmPassword) {
            FormValidator.showError(document.getElementById('confirm-password'), 'Passwords do not match');
            return;
        }
        
        // Here you would make an API call to update the password
        window.location.href = 'login.html';
    }
    
    window.sendResetLink = sendResetLink;
    window.resetPassword = resetPassword;
});
