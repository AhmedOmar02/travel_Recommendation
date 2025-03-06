var countries = [];
var temples = [];
var beaches = [];

// Fetch JSON data
function readJSON() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            countries = data.countries;
            temples = data.temples;
            beaches = data.beaches;
        })
        .catch(error => {
            console.error('Error reading file:', error);
        });
}

readJSON();

// Function to search and display results
function searchByName() {
    const input = document.getElementById('nameInput').value.toLowerCase();

    // Get the search results container
    let resultsContainer = document.getElementById('results');

    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'results';
        document.body.appendChild(resultsContainer);
    }

    // Clear previous results
    resultsContainer.innerHTML = '';

    let foundResults = false;

    function addResult(title, imageUrl, description) {
        foundResults = true;
        resultsContainer.innerHTML += `
            <div class="result-item">
                <h3>${title}</h3>
                <img src="${imageUrl}" alt="${title}">
                <p>${description}</p>
            </div>
        `;
    }

    // Search in countries
    countries.forEach(country => {
        if (country.name.toLowerCase().includes(input)) {
            addResult(country.name, country.imageUrl, country.description);
        }

        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(input)) {
                addResult(city.name, city.imageUrl, city.description);
            }
        });
    });

    // Search in temples
    temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(input)) {
            addResult(temple.name, temple.imageUrl, temple.description);
        }
    });

    // Search in beaches
    beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(input)) {
            addResult(beach.name, beach.imageUrl, beach.description);
        }
    });

    // If no results found
    if (!foundResults) {
        resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
    }
}
function clearSearch() {
    document.getElementById('nameInput').value = ''; // Clear input field
    document.getElementById('results').innerHTML = ''; // Remove search results
}
