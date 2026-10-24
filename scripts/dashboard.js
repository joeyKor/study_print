/**
 * Dashboard Navigation, Filter Tabs, Real-time Search, and Favorites System
 */

(function() {
    let activeCategory = 'all';
    let searchQuery = '';
    const FAVORITES_KEY = 'study_worksheet_favorites';

    function getFavorites() {
        try {
            const raw = localStorage.getItem(FAVORITES_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function saveFavorites(favs) {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
        } catch (e) {
            console.error('Failed to save favorites', e);
        }
    }

    window.toggleFavorite = function(event, cardId) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        let favs = getFavorites();
        if (favs.includes(cardId)) {
            favs = favs.filter(id => id !== cardId);
        } else {
            favs.push(cardId);
        }
        saveFavorites(favs);
        updateFavoriteButtons();
        renderFavoritesSection();
    };

    function updateFavoriteButtons() {
        const favs = getFavorites();
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const cardId = btn.getAttribute('data-fav-id');
            const icon = btn.querySelector('i');
            if (!icon) return;
            if (favs.includes(cardId)) {
                btn.classList.add('is-favorited');
                icon.className = 'fas fa-star';
                btn.title = '즐겨찾기 해제';
            } else {
                btn.classList.remove('is-favorited');
                icon.className = 'far fa-star';
                btn.title = '즐겨찾기 추가';
            }
        });
    }

    window.renderFavoritesSection = function() {
        const favContainer = document.getElementById('favorites-section');
        const favGrid = document.getElementById('favorites-grid');
        if (!favContainer || !favGrid) return;

        const favs = getFavorites();
        if (favs.length === 0 || searchQuery !== '' || activeCategory !== 'all') {
            favContainer.style.display = 'none';
            return;
        }

        favGrid.innerHTML = '';
        favs.forEach(cardId => {
            const originalCard = document.querySelector(`.category-card[data-card-id="${cardId}"]`);
            if (originalCard) {
                const clone = originalCard.cloneNode(true);
                // Ensure click handler on clone
                const clickAttr = originalCard.getAttribute('onclick');
                if (clickAttr) clone.setAttribute('onclick', clickAttr);
                
                // Re-bind favorite button in clone
                const favBtn = clone.querySelector('.favorite-btn');
                if (favBtn) {
                    favBtn.onclick = function(e) {
                        toggleFavorite(e, cardId);
                    };
                }
                favGrid.appendChild(clone);
            }
        });

        favContainer.style.display = favGrid.children.length > 0 ? 'block' : 'none';
        updateFavoriteButtons();
    };

    window.setMenuCategory = function(cat, btnElem) {
        activeCategory = cat;

        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-filter') === cat);
        });

        applyFilters();
    };

    window.handleSearchInput = function(val) {
        searchQuery = (val || '').trim().toLowerCase();
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) {
            clearBtn.style.display = searchQuery ? 'flex' : 'none';
        }
        applyFilters();
    };

    window.clearSearch = function() {
        const input = document.getElementById('menu-search-input');
        if (input) {
            input.value = '';
            input.focus();
        }
        handleSearchInput('');
    };

    function applyFilters() {
        const sections = document.querySelectorAll('.menu-section');
        const emptyState = document.getElementById('menu-empty-state');
        const isSearching = searchQuery.length > 0;
        let totalVisibleCards = 0;

        // Toggle Favorites Section
        const favContainer = document.getElementById('favorites-section');
        if (favContainer) {
            favContainer.style.display = (!isSearching && activeCategory === 'all' && getFavorites().length > 0) ? 'block' : 'none';
        }

        sections.forEach(section => {
            if (section.id === 'favorites-section') return;

            const sectionCat = section.getAttribute('data-section-category');
            const categoryMatch = (activeCategory === 'all' || activeCategory === sectionCat);

            const cards = section.querySelectorAll('.category-card');
            let visibleCardsInSection = 0;

            cards.forEach(card => {
                let matchesSearch = true;
                if (isSearching) {
                    const title = (card.querySelector('h3')?.innerText || '').toLowerCase();
                    const desc = (card.querySelector('p')?.innerText || '').toLowerCase();
                    const tags = (card.getAttribute('data-keywords') || '').toLowerCase();
                    matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery) || tags.includes(searchQuery);
                }

                if (categoryMatch && matchesSearch) {
                    card.style.display = '';
                    visibleCardsInSection++;
                    totalVisibleCards++;
                } else {
                    card.style.display = 'none';
                }
            });

            // If no cards match in this section, hide section header as well
            if (visibleCardsInSection > 0) {
                section.style.display = 'block';
                const countBadge = section.querySelector('.section-count');
                if (countBadge) {
                    countBadge.innerText = `${visibleCardsInSection}개`;
                }
            } else {
                section.style.display = 'none';
            }
        });

        if (emptyState) {
            emptyState.style.display = totalVisibleCards === 0 ? 'flex' : 'none';
            const termSpan = document.getElementById('empty-search-term');
            if (termSpan) termSpan.innerText = searchQuery ? `"${searchQuery}"` : '';
        }
    }

    function init() {
        updateFavoriteButtons();
        renderFavoritesSection();

        const input = document.getElementById('menu-search-input');
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    clearSearch();
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
