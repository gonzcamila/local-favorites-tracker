// At the very top of js/app.js, above your functions
let favorites = [];

const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');

// My favorite place, modeled as an object
let myFavorite = {
    name: 'Starbucks on University Drive',
    category: 'coffee',
    rating: 5,
    notes: 'Great study spot with fast wifi',
    dateAdded: new Date().toLocaleDateString()
};

// this is showing the object and its properties
console.log(myFavorite);
console.log(myFavorite.name);
console.log(myFavorite.category);
console.log(myFavorite.rating);
console.log(myFavorite.notes);
console.log(myFavorite.dateAdded);

// this is showing string from the object's properties
let displayText = myFavorite.name + ' - Rating: ' + myFavorite.rating + '/5';
console.log(displayText);

// Makes sure each field has the correct data type
console.log(typeof myFavorite.name);       // string
console.log(typeof myFavorite.category);   // string
console.log(typeof myFavorite.rating);     // number
console.log(typeof myFavorite.notes);      // string
console.log(typeof myFavorite.dateAdded);  // string

// adds a new favorite to the list, then updates the page
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
    form.reset();
    displayFavorites();
}

form.addEventListener('submit', addFavorite);

// this shows the current favorites on the page
function displayFavorites() {
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
        return;
    }
    favorites.forEach(function(favorite) {
        const stars = '⭐'.repeat(favorite.rating);
        favoritesList.innerHTML += `
            <div class="favorite-card">
                <h3>${favorite.name}</h3>
                <span class="favorite-category">${favorite.category}</span>
                <div class="favorite-rating">${stars} (${favorite.rating}/5)</div>
                <p class="favorite-notes">${favorite.notes}</p>
                <p class="favorite-date">Added: ${favorite.dateAdded}</p>
            </div>`;
    });
}

// The last line in app.js
displayFavorites();