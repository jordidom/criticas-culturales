tailwind.config = { theme: { extend: { colors: { primary: '#3b82f6', secondary: '#6366f1' }, borderRadius: { 'none': '0px', 'sm': '4px', DEFAULT: '8px', 'md': '12px', 'lg': '16px', 'xl': '20px', '2xl': '24px', '3xl': '32px', 'full': '9999px', 'button': '8px' } } } }

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
    // Pagination functionality
    const booksGrid = document.getElementById('booksGrid');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const booksPerPage = 8;
    let currentPage = 1;
    // Get all book cards
    const allBooks = Array.from(booksGrid.querySelectorAll('.book-card'));
    const totalPages = Math.ceil(allBooks.length / booksPerPage);
    // Function to update page numbers display
    function updatePageNumbers() {
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `relative inline-flex items-center px-4 py-2 border border-gray-200 ${currentPage === i ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                } text-sm font-medium`;
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                goToPage(i);
            });
            pageNumbers.appendChild(pageLink);
        }
    }
    // Function to show books for current page
    function showBooksForPage(page) {
        const start = (page - 1) * booksPerPage;
        const end = start + booksPerPage;
        allBooks.forEach((book, index) => {
            book.style.display = (index >= start && index < end) ? '' : 'none';
        });
    }
    // Function to go to specific page
    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        showBooksForPage(currentPage);
        updatePageNumbers();
        booksGrid.scrollIntoView({ behavior: 'smooth' });
        updatePaginationButtons();
    }
    // Function to update pagination buttons state
    function updatePaginationButtons() {
        prevPageBtn.classList.toggle('opacity-50', currentPage === 1);
        prevPageBtn.classList.toggle('cursor-not-allowed', currentPage === 1);
        nextPageBtn.classList.toggle('opacity-50', currentPage === totalPages);
        nextPageBtn.classList.toggle('cursor-not-allowed', currentPage === totalPages);
    }
    // Event listeners for prev/next buttons
    prevPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) goToPage(currentPage - 1);
    });
    nextPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });
    // Initialize pagination
    updatePageNumbers();
    showBooksForPage(currentPage);
    updatePaginationButtons();
});
document.addEventListener('DOMContentLoaded', function () {
    // Filter toggle
    const filterToggle = document.getElementById('filterToggle');
    const advancedFilters = document.getElementById('advancedFilters');
    filterToggle.addEventListener('click', function () {
        advancedFilters.classList.toggle('hidden');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Favorites functionality
    const booksGrid = document.getElementById('booksGrid');
    const favoritesOnly = document.getElementById('favoritesOnly');
    const recentOnly = document.getElementById('recentOnly');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    // Add review dates to books (for demo purposes)
    const bookCards = booksGrid.querySelectorAll('.book-card');
    const reviewDates = new Map();
    bookCards.forEach((card) => {
        if (card.dataset.new === 'true') {
            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'Nuevo';
            card.querySelector('.relative').appendChild(badge);
        }
    });    
    const noFavoritesMessage = document.createElement('div');
    noFavoritesMessage.className = 'col-span-full text-center py-8 text-secondary';
    noFavoritesMessage.textContent = 'No hay libros favoritos seleccionados';
    noFavoritesMessage.style.display = 'none';
    booksGrid.appendChild(noFavoritesMessage);
    // Initialize favorites from localStorage
    const favorites = new Set(JSON.parse(localStorage.getItem('bookFavorites')) || []);
    // Update favorite button states
    function updateFavoriteButtons() {
        favoriteButtons.forEach((btn, index) => {
            const icon = btn.querySelector('i');
            if (favorites.has(index)) {
                icon.className = 'ri-heart-fill';
                btn.classList.add('text-red-500');
                btn.classList.remove('text-gray-400');
            } else {
                icon.className = 'ri-heart-line';
                btn.classList.add('text-gray-400');
                btn.classList.remove('text-red-500');
            }
        });
    }
    // Toggle favorite status
    favoriteButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (favorites.has(index)) {
                favorites.delete(index);
            } else {
                favorites.add(index);
            }
            localStorage.setItem('bookFavorites', JSON.stringify(Array.from(favorites)));
            updateFavoriteButtons();
            if (favoritesOnly.checked) {
                filterFavorites();
            }
        });
    });
    // Filter favorites
    function filterBooks() {
        const bookCards = booksGrid.querySelectorAll('.book-card');
        let hasVisibleBooks = false;
        const today = new Date();
        bookCards.forEach((card, index) => {
            let shouldShow = true;
            // Check favorites filter
            if (favoritesOnly.checked) {
                shouldShow = shouldShow && favorites.has(index);
            }
            // Check recent reviews filter
            if (recentOnly.checked) {
                const reviewDate = reviewDates.get(index);
                const daysDiff = Math.floor((today - reviewDate) / (1000 * 60 * 60 * 24));
                shouldShow = shouldShow && (daysDiff <= 30);
            }
            if (shouldShow) {
                card.style.display = '';
                hasVisibleBooks = true;
            } else {
                card.style.display = 'none';
            }
        });
        noFavoritesMessage.style.display = !hasVisibleBooks ? 'block' : 'none';
        noFavoritesMessage.textContent = !hasVisibleBooks ?
            (favoritesOnly.checked && recentOnly.checked ? 'No hay libros favoritos con reseñas recientes' :
                favoritesOnly.checked ? 'No hay libros favoritos seleccionados' :
                    recentOnly.checked ? 'No hay reseñas recientes' : 'No se encontraron libros') : '';
    }
    favoritesOnly.addEventListener('change', filterBooks);
    recentOnly.addEventListener('change', filterBooks);
    // Initialize favorite buttons
    updateFavoriteButtons();
    // Reset filters
    const resetFilters = document.getElementById('resetFilters');
    let toastTimeout;
    function showToast(message) {
        // Remove existing toast if present
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        // Force reflow
        toast.offsetHeight;
        // Show toast
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        // Clear existing timeout
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }
        // Hide toast after 3 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    resetFilters.addEventListener('click', function () {
        document.getElementById('searchInput').value = '';
        document.getElementById('genreFilter').selectedIndex = 0;
        document.getElementById('yearFrom').value = '';
        document.getElementById('yearTo').value = '';
        document.getElementById('ratingFilter').selectedIndex = 0;
        document.getElementById('authorFilter').selectedIndex = 0;
        document.getElementById('favoritesOnly').checked = false;
        document.getElementById('recentOnly').checked = false;
        showToast('Filtros restablecidos correctamente');
    });
});