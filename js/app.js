// At the very top of js/app.js, above your functions
let favorites = [];

const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// My favorite place, modeled as an object
let myFavorite = {
    name: 'Starbucks on University Drive',
    category: 'coffee',
    rating: 5,
    notes: 'Great study spot with fast wifi',
    dateAdded: new Date().toLocaleDateString()
};


console.log(myFavorite);
console.log(myFavorite.name);
console.log(myFavorite.category);
console.log(myFavorite.rating);
console.log(myFavorite.notes);
console.log(myFavorite.dateAdded);


let displayText = myFavorite.name + ' - Rating: ' + myFavorite.rating + '/5';
console.log(displayText);

// this part akes sure each field has the correct data type
console.log(typeof myFavorite.name);       // string
console.log(typeof myFavorite.category);   // string
console.log(typeof myFavorite.rating);     // number
console.log(typeof myFavorite.notes);      // string
console.log(typeof myFavorite.dateAdded);  // string

// adds new favorite to the list updates the page
function addFavorite(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value;

    if (!name || !category) {
        alert('Please fill in name and category!');
        return;
    }

    const newFavorite = {
        name: name,
        category: category,
        rating: parseInt(document.getElementById('rating').value),
        notes: document.getElementById('notes').value.trim(),
        dateAdded: new Date().toLocaleDateString()
    };

    favorites.push(newFavorite);
    saveFavorites();      // new — saves right after adding
    form.reset();
    displayFavorites();
}

form.addEventListener('submit', addFavorite);

// removes a favorite 
function deleteFavorite(index) {
    const favorite = favorites[index];
    if (confirm(`Delete "${favorite.name}"?`)) {
        favorites.splice(index, 1);   // remove 1 item at index
        saveFavorites();              // new save after deleting
        searchFavorites();            
    }
}

// filters by search text  and ategory
function searchFavorites() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = favorites.filter(function(favorite) {
        const matchesSearch = searchText === '' ||
            favorite.name.toLowerCase().includes(searchText) ||
            favorite.notes.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === 'all' ||
            favorite.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
        return;
    }

    if (filtered.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites match your search.</p>';
        return;
    }

    filtered.forEach(function(favorite) {
        const index = favorites.indexOf(favorite);
        const stars = '⭐'.repeat(favorite.rating);
        favoritesList.innerHTML += `
            <div class="favorite-card">
                <h3>${favorite.name}</h3>
                <span class="favorite-category">${favorite.category}</span>
                <div class="favorite-rating">${stars} (${favorite.rating}/5)</div>
                <p class="favorite-notes">${favorite.notes}</p>
                <p class="favorite-date">Added: ${favorite.dateAdded}</p>
                <button class="btn-danger" onclick="deleteFavorite(${index})">Delete</button>
            </div>`;
    });
}

// resets search/filter controls, then re-renders through searchFavorites
function displayFavorites() {
    searchInput.value = '';          // clear the search box
    categoryFilter.value = 'all';    // back to All categories
    searchFavorites();
}

// search and filter listeners
searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);

// saves the favorites 
function saveFavorites() {
    try {
        localStorage.setItem('localFavorites', JSON.stringify(favorites));
    } catch (error) {
        alert('Unable to save favorites. Storage may be disabled.');
    }
}

// loads favorites from localStorage, or starts empty
function loadFavorites() {
    try {
        const saved = localStorage.getItem('localFavorites');
        if (saved) {
            favorites = JSON.parse(saved);
        } else {
            favorites = [];
        }
    } catch (error) {
        favorites = [];
    }
}


// The last lines in js/app.js
loadFavorites();      // new: fill favorites from storage first
displayFavorites();   // already here since Lab 13.5