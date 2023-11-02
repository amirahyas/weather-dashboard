        // get city from user
        var txtCity = document.getElementById("city"); // This is looking for an element with the id "city".

        // get weather button
        var btnWeather = document.getElementById("btnWeather"); // This is looking for an element with the id "btnWeather".
        btnWeather.addEventListener("click", getWeather); // This is listening for when you click the button.

        // returns geolocation based on city name and api key
        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
        function getWeather() {
            // This is like a secret code that tells the computer who you are and what you want.
            var apiKey = "f323762659d7f689219c2c868b844fc0";
            var city = txtCity.value; // This is getting the city you typed in.

            // This part will get the weather information for the city.
            fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',840&limit=1&appid=' + apiKey)
                .then(response => response.json())
                .then(answer => {
                    for (let i = 0; i < answer.length; i++) {
                        console.log("lat = " + answer[i].lat + ", longitude is: " + answer[i].lon);
                    }
                })
        }
 
                document.getElementById('searchForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const cityName = document.getElementById('cityInput').value;
                    // Use cityName to fetch weather data and update the UI
                });
                
function getCoordinates(cityName) {
    // This is a special web address that will give us information about a city.
    // But, we need to replace {lat}, {lon}, and {part} with real values.
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=f323762659d7f689219c2c868b844fc0`;
    // We send a request to the web address to get the information.
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            displayCoordinates(latitude, longitude);
        } else {
            displayError('Could not find coordinates for the provided city.');
        }
    })
    .catch(error => displayError(`Error fetching data: ${error}`));
}

function displayCoordinates(latitude, longitude) {
// This is where we'll show the latitude and longitude on the webpage.
document.getElementById('result').innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function displayError(message) {
// If there's an error, we'll show a message in red on the webpage.
document.getElementById('result').innerHTML = `<p style="color: red;">${message}</p>`;
}


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
