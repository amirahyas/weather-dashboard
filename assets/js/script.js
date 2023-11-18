document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('cityInput').value;
    const stateName = document.getElementById('stateInput').value;
    // getCoordinates(txtCity.value, txtCity.value);
});


document.addEventListener('DOMContentLoaded', function () {
    // Code inside this block runs after the DOM has fully loaded
    // Your initial setup and any other logic should go here
   txtCity = document.getElementById('cityInput');
   txtState = document.getElementById('stateInput');
    var btnWeather = document.getElementById('btnWeather');
    btnWeather.addEventListener('click', getWeather);
});

function getCoordinates(cityName, stateName) {
    const apiKey = 'f323762659d7f689219c2c868b844fc0';
    const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + stateName + ',USA&limit=1&appid=' + apiKey;

    const resultElement = document.getElementById('result');


    fetch(apiUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData) {
                const latitude = geoData[0].lat;
                const longitude = geoData[0].lon;

                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
                    .then(response => response.json())
                    .then(weatherData => {

                        let myData = weatherData;
                        let list = weatherData.list;

                        for (let i = 0; i < list.length; i++) {
                            console.log(list[i].dt_txt);
                        }

                        displayCoordinates(latitude, longitude);
                     })
                    .catch(error => displayError(`Error fetching weather data: ${error}`));
            } else {
                displayError('Could not find coordinates for the provided city.')
            }
        })
}   
                    
    

function displayCoordinates(latitude, longitude) {
    document.getElementById('result').innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function displayError(message) {
    document.getElementById('result').innerHTML = `
    <p style="color: red;">${message}</p>`;
}

function getWeather() {
    var apiKey = 'f323762659d7f689219c2c868b844fc0';
    var city = txtCity.value;
    var state = txtState.value;
    

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',840&limit=1&appid=' + apiKey)
        .then(response => response.json())
        .then(answer => {

            if (answer.length > 0) {
                const latitude = answer[0].lat;
                const longitude = answer[0].lon;

                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
                    .then(response => response.json())
                    .then(data => {
                        const cardsToDisplay = Math.min(4, data.list.length); // Determine the number of cards to display

                        for (let i = 0; i < cardsToDisplay; i++) {
                            let cardCityName = document.getElementById(`cardCityName${i}`);
                            cardCityName.textContent = data.city.name;

                            let cardDate = document.getElementById(`cardDate${i}`);
                            cardDate.innerHTML = "Date: " + new Date(data.list[i].dt_txt).toLocaleString();

                            let cardTemp = document.getElementById(`cardTemp${i}`);
                            cardTemp.innerHTML = "Temperature: " + data.list[i].main.temp + '&deg;F';

                            let cardHumidity = document.getElementById(`cardHumidity${i}`);
                            cardHumidity.innerHTML = "Humidity: " + data.list[i].main.humidity + '%';

                            let cardWindSpeed = document.getElementById(`cardWindSpeed${i}`);
                            cardWindSpeed.innerHTML = "Wind Speed: " + data.list[i].wind.speed + 'mph';

                            let cardIcon = document.getElementById(`cardIcon${i}`);
                            let icon = data.list[i].weather[0].icon;
                            let description = data.list[i].weather[0].description;
                            let baseUrl = 'https://openweathermap.org/img/wn/' + icon + '.png';
                            cardIcon.src = baseUrl;
                            cardIcon.alt = description;

                            if (i === 3) {
                                let cardCityName = document.getElementById(`cardCityName${i}`);
                                cardCityName.textContent = data.city.name;
                        
                                let cardDate = document.getElementById(`cardDate${i}`);
                                cardDate.innerHTML = "Date: " + new Date(data.list[i].dt_txt).toLocaleString();
                        
                                let cardTemp = document.getElementById(`cardTemp${i}`);
                                cardTemp.innerHTML = "Temperature: " + data.list[i].main.temp + '&deg;F';
                        
                                let cardHumidity = document.getElementById(`cardHumidity${i}`);
                                cardHumidity.innerHTML = "Humidity: " + data.list[i].main.humidity + '%';
                        
                                let cardWindSpeed = document.getElementById(`cardWindSpeed${i}`);
                                cardWindSpeed.innerHTML = "Wind Speed: " + data.list[i].wind.speed + 'mph';
                        
                                let cardIcon = document.getElementById(`cardIcon${i}`);
                                let icon = data.list[i].weather[0].icon;
                                let description = data.list[i].weather[0].description;
                                let baseUrl = 'https://openweathermap.org/img/wn/' + icon + '.png';
                                cardIcon.src = baseUrl;
                                cardIcon.alt = description;
                            }

                        // } else {
                        //         displayError('Could not find weather data for card ' + i);
                        //     }
                         }
                    })
                    .catch(error => displayError(`Error fetching weather data: ${error}`));
            } else {
                displayError('Could not find coordinates for the provided city.');
            }
        })
}
