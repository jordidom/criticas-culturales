tailwind.config = { theme: { extend: { colors: { primary: '#3b82f6', secondary: '#6366f1' }, borderRadius: { 'none': '0px', 'sm': '4px', DEFAULT: '8px', 'md': '12px', 'lg': '16px', 'xl': '20px', '2xl': '24px', '3xl': '32px', 'full': '9999px', 'button': '8px' } } } }

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // Custom checkbox
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', function () {
            const checkIcon = this.parentElement.querySelector('.absolute');
            if (this.checked) {
                checkIcon.classList.remove('hidden');
            } else {
                checkIcon.classList.add('hidden');
            }
        });
    }
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const privacy = document.getElementById('privacy').checked;
            if (!name || !email || !subject || !message || !privacy) {
                alert('Por favor, completa todos los campos obligatorios y acepta la política de privacidad.');
                return;
            }
            // Show success message (in a real implementation, you would send the data to a server)
            alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
            contactForm.reset();
        });
    }
});