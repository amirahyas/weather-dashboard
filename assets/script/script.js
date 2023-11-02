document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('cityInput').value;
    // Use cityName to fetch weather data and update the UI
});

function displayCurrentWeather(data) {
    // Update the #currentWeather element with the current weather data
}

function displayForecast(data) {
    // Update the #forecast element with the 5-day forecast data
}

function displaySearchHistory(history) {
    // Update the #searchHistory element with the search history data
}

// Add event listener for when a city in the search history is clicked
document.getElementById('searchHistory').addEventListener('click', function(event) {
    if (event.target.matches('button')) {
        const cityName = event.target.textContent;
        // Use cityName to fetch weather data and update the UI
    }
});
