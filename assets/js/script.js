document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('cityInput').value;
    const stateName = document.getElementById('stateInput').value;
    getCoordinates(cityName, stateName);
});

function getCoordinates(cityName, stateName) {
    var apiKey = 'f323762659d7f689219c2c868b844fc0';
    const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + stateName + ',USA&limit=1&appid=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;

                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
                    .then(response => response.json())
                    .then(data => {
                        // Update card content
                        let city_name = document.getElementById('city_name');
                        city_name.innerHTML = data.city.name;

                        let myDate = document.getElementById('myDate');
                        myDate.innerHTML = new Date(data.list[0].dt_txt).toLocaleString();

                        // let icon = document.getElementById('icon');
                        let temp = document.getElementById('temp');
                        temp.innerHTML = data.list[0].main.temp + '&deg;F';

                        let humidity = document.getElementById('humidity');
                        humidity.innerHTML = data.list[0].main.humidity + '%';

                        let wind_speed = document.getElementById('wind_speed');
                        wind_speed.innerHTML = data.list[0].wind.speed + 'mph';

                        var img = document.getElementById('icon');
                        var icon = data.list[0].weather[0].icon;
                        var description = data.list[0].weather[0].description; // Get weather description (optional)
                        var baseUrl = 'https://openweathermap.org/img/wn/' + icon + '.png';
                        img.src = baseUrl;
                        img.alt = description; // Set alt text for accessibility (optional)

                        // Return data to continue the promise chain
                        return data;
                    })
                    .then(data => {
                        let myData = data;
                        let list = data.list;

                        for (let i = 0; i < list.length; i++) {
                            console.log(list[i].dt_txt);
                        }

                        let car = {};
                        car.engine = 'running';
                        car.color = 'brown';

                        console.log(car.color);
                    });

                displayCoordinates(latitude, longitude);
            } else {
                displayError('Could not find coordinates for the provided city.');
            }
        })
        .catch(error => displayError(`Error fetching data: ${error}`));
}

function displayCoordinates(latitude, longitude) {
    document.getElementById('result').innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function displayError(message) {
    document.getElementById('result').innerHTML = `
    <p style="color: red;">${message}</p>`;
}

// get city and state from user
var txtCity = document.getElementById('cityInput');
var txtState = document.getElementById('stateInput');

// get weather button
var btnWeather = document.getElementById('btnWeather');
btnWeather.addEventListener('click', getWeather);

// Remove duplicate event listener
// if (btnWeather) {
//     btnWeather.addEventListener('click', getWeather);
// }

function getWeather() {
    var apiKey = 'f323762659d7f689219c2c868b844fc0';
    var city = txtCity.value;
    var state = txtState.value;

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',840&limit=1&appid=' + apiKey)
        .then(response => response.json())
        .then(answer => {
            for (let i = 0; i < answer.length; i++) {
                console.log('lat = ' + answer[i].lat + ', longitude is: ' + answer[i].lon);
            }
        });
}
