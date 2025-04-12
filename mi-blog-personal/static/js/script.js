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
    // Custom checkboxes
    const checkboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.classList.add('bg-primary', 'border-primary');
            } else {
                checkmark.classList.remove('bg-primary', 'border-primary');
            }
        });
    });
    // Star rating
    const starLabels = document.querySelectorAll('.star-rating label');
    starLabels.forEach(label => {
        label.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input) {
                input.checked = true;
            }
        });
    });
});