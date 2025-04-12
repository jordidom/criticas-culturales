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
    const notificationsCheckbox = document.getElementById('notifications');
    if (notificationsCheckbox) {
        notificationsCheckbox.addEventListener('change', function () {
            const checkIcon = this.parentElement.querySelector('.absolute');
            if (this.checked) {
                checkIcon.classList.remove('hidden');
            } else {
                checkIcon.classList.add('hidden');
            }
        });
    }
    // Petition form submission
    const petitionForm = document.getElementById('petition-form');
    if (petitionForm) {
        petitionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simple validation
            const title = document.getElementById('title').value;
            const contentType = document.getElementById('content-type').value;
            const justification = document.getElementById('justification').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            if (!title || !contentType || !justification || !name || !email) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            // Show success message (in a real implementation, you would send the data to a server)
            alert('¡Gracias por tu petición! La revisaremos lo antes posible.');
            petitionForm.reset();
        });
    }
    // Vote buttons
    const voteButtons = document.querySelectorAll('.petition-card button');
    voteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const countElement = this.nextElementSibling;
            let count = parseInt(countElement.textContent);
            count++;
            countElement.textContent = count;
            this.classList.add('text-primary');
            this.classList.remove('text-gray-400');
            this.disabled = true;
        });
    });
});