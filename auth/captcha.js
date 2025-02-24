class Captcha {
    constructor() {
        this.captchaText = '';
        this.captchaLength = 6;
        this.captchaContainer = document.getElementById('captcha');
        this.generateCaptcha();
        this.setupEventListeners();
    }

    generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.captchaText = '';
        
        for (let i = 0; i < this.captchaLength; i++) {
            this.captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        this.captchaContainer.innerHTML = this.captchaText;
        this.distortCaptcha();
    }

    distortCaptcha() {
        const chars = this.captchaContainer.innerText.split('');
        this.captchaContainer.innerHTML = chars.map(char => 
            `<span style="
                transform: rotate(${Math.random() * 20 - 10}deg);
                display: inline-block;
                color: rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100});
            ">${char}</span>`
        ).join('');
    }

    validateCaptcha(input) {
        return input.toLowerCase() === this.captchaText.toLowerCase();
    }

    setupEventListeners() {
        const captchaInput = document.getElementById('captcha-input');
        const loginForm = document.getElementById('login-form');

        loginForm.addEventListener('submit', (e) => {
            if (!this.validateCaptcha(captchaInput.value)) {
                e.preventDefault();
                captchaInput.style.borderColor = 'var(--error-color)';
                this.generateCaptcha();
                captchaInput.value = '';
            }
        });

        this.captchaContainer.addEventListener('click', () => {
            this.generateCaptcha();
        });
    }
}

// Initialize Captcha
new Captcha();
