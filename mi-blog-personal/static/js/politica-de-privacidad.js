tailwind.config = { theme: { extend: { colors: { primary: '#3b82f6', secondary: '#6366f1' }, borderRadius: { 'none': '0px', 'sm': '4px', DEFAULT: '8px', 'md': '12px', 'lg': '16px', 'xl': '20px', '2xl': '24px', '3xl': '32px', 'full': '9999px', 'button': '8px' } } } }

document.addEventListener('DOMContentLoaded', function () {
    // Create privacy acceptance toast
    const privacyToast = document.createElement('div');
    privacyToast.className = 'toast';
    privacyToast.innerHTML = `
<i class="ri-checkbox-circle-line"></i>
<span>Has aceptado nuestra política de privacidad. Gracias por tu confianza.</span>
`;
    document.body.appendChild(privacyToast);
    // Privacy acceptance functionality
    const acceptPrivacyBtn = document.getElementById('acceptPrivacyBtn');
    if (acceptPrivacyBtn) {
        acceptPrivacyBtn.addEventListener('click', function () {
            // Save to localStorage
            localStorage.setItem('privacyPolicyAccepted', 'true');
            localStorage.setItem('privacyPolicyAcceptedDate', new Date().toISOString());

            // Show toast
            privacyToast.classList.add('show');
            setTimeout(() => {
                privacyToast.classList.remove('show');
            }, 3000);

            // Disable button after acceptance
            acceptPrivacyBtn.disabled = true;
            acceptPrivacyBtn.classList.add('opacity-50', 'cursor-not-allowed');
        });
    }
    // Check if policy was previously accepted
    if (localStorage.getItem('privacyPolicyAccepted') === 'true') {
        const acceptPrivacyBtn = document.getElementById('acceptPrivacyBtn');
        if (acceptPrivacyBtn) {
            acceptPrivacyBtn.disabled = true;
            acceptPrivacyBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    // Create confirmation dialog
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    confirmDialog.innerHTML = `
<div class="bg-white rounded-lg p-6 max-w-md mx-4">
<h3 class="text-xl font-bold text-gray-800 mb-4">Confirmar restablecimiento</h3>
<p class="text-gray-700 mb-6">¿Estás seguro de que deseas restablecer todas tus preferencias de privacidad a los valores predeterminados?</p>
<div class="flex justify-end gap-4">
<button id="cancelResetBtn" class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-button font-medium hover:bg-gray-50 transition whitespace-nowrap">Cancelar</button>
<button id="confirmResetBtn" class="bg-primary text-white px-4 py-2 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap">Confirmar</button>
</div>
</div>
`;
    document.body.appendChild(confirmDialog);
    // Reset preferences function
    function resetPreferences() {
        // Default values
        const defaultPreferences = {
            'Cookies esenciales': true,
            'Cookies de preferencias': true,
            'Cookies analíticas': true,
            'Cookies de marketing': false,
            'Boletín semanal': true,
            'Notificaciones de comentarios': true,
            'Recomendaciones personalizadas': true,
            'Ofertas especiales': false,
            'Perfil público': true,
            'Historial de visualización': true,
            'Compartir con socios': false
        };
        // Apply default values to switches
        document.querySelectorAll('.custom-switch input[type="checkbox"]').forEach(checkbox => {
            const preferenceName = checkbox.parentElement.previousElementSibling.querySelector('p').textContent;
            if (defaultPreferences.hasOwnProperty(preferenceName)) {
                checkbox.checked = defaultPreferences[preferenceName];
            }
        });
        // Save to localStorage
        localStorage.setItem('privacyPreferences', JSON.stringify(defaultPreferences));
        // Show confirmation toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
<i class="ri-checkbox-circle-line"></i>
<span>Tus preferencias han sido restablecidas a los valores predeterminados</span>
`;
        document.body.appendChild(toast);
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.remove();
        }, 3000);
        // Hide dialog
        confirmDialog.classList.add('hidden');
    }
    // Add click event listeners for reset functionality
    const resetPreferencesBtn = document.getElementById('resetPreferencesBtn');
    const cancelResetBtn = document.getElementById('cancelResetBtn');
    const confirmResetBtn = document.getElementById('confirmResetBtn');
    if (resetPreferencesBtn) {
        resetPreferencesBtn.addEventListener('click', () => {
            confirmDialog.classList.remove('hidden');
        });
    }
    if (cancelResetBtn) {
        cancelResetBtn.addEventListener('click', () => {
            confirmDialog.classList.add('hidden');
        });
    }
    if (confirmResetBtn) {
        confirmResetBtn.addEventListener('click', resetPreferences);
    }
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
<i class="ri-checkbox-circle-line"></i>
<span>Tus preferencias de privacidad han sido guardadas correctamente</span>
`;
    document.body.appendChild(toast);
    // Save preferences function
    function savePreferences() {
        const preferences = {};
        document.querySelectorAll('.custom-switch input[type="checkbox"]').forEach(checkbox => {
            preferences[checkbox.parentElement.previousElementSibling.querySelector('p').textContent] = checkbox.checked;
        });
        // Save to localStorage
        localStorage.setItem('privacyPreferences', JSON.stringify(preferences));
        // Show toast
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    // Load saved preferences
    const savedPreferences = localStorage.getItem('privacyPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        document.querySelectorAll('.custom-switch input[type="checkbox"]').forEach(checkbox => {
            const preferenceName = checkbox.parentElement.previousElementSibling.querySelector('p').textContent;
            if (preferences.hasOwnProperty(preferenceName)) {
                checkbox.checked = preferences[preferenceName];
            }
        });
    }
    // Add click event listener to save button
    const savePreferencesBtn = document.getElementById('savePreferencesBtn');
    if (savePreferencesBtn) {
        savePreferencesBtn.addEventListener('click', savePreferences);
    }
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // Custom switches
    const switches = document.querySelectorAll('.custom-switch input[type="checkbox"]');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function () {
            // You could add functionality here to save preferences
            console.log('Switch toggled:', this.checked);
        });
    });
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                if (content.classList.contains('active')) {
                    icon.classList.remove('ri-add-line');
                    icon.classList.add('ri-subtract-line');
                } else {
                    icon.classList.remove('ri-subtract-line');
                    icon.classList.add('ri-add-line');
                }
            }
        });
    });
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});