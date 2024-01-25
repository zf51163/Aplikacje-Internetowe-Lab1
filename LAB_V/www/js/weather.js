



function getWeather() {
    const cityInput = document.getElementById('cityInput').value;

    // Get current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
    makeRequest(currentWeatherUrl, displayCurrentWeather);

    // Get 5 day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;
    makeRequest(forecastUrl, displayForecast);
}

function displayAutocomplete(data) {
    const autocompleteList = document.getElementById('autocompleteList');
    autocompleteList.innerHTML = '';

    data.list.forEach(city => {
        const cityName = city.name;
        const country = city.sys.country;
        const option = document.createElement('option');
        option.value = `${cityName}, ${country}`;
        autocompleteList.appendChild(option);
    });
}

const apiKey = 'f98505ee472c49a0202fb7b00d4cbbd9';

function getAutocomplete() {
    const cityInput = document.getElementById('cityInput').value;

    // Get suggested cities for autocomplete
    const autocompleteUrl = `https://api.openweathermap.org/data/2.5/find?q=${cityInput}&type=like&sort=population&cnt=5&appid=${apiKey}`;
    makeRequest(autocompleteUrl, displayAutocomplete);
}

function makeRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            callback(response);
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };
    xhr.send();
}

function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const currentWeather = data.weather[0].description;
    const temperatureKelvin = data.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;

    weatherInfo.innerHTML = `<p>Current Weather: ${currentWeather}</p>
                             <p>Temperature: ${temperatureCelsius.toFixed(2)} &#8451;</p>`;
}

function displayForecast(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const forecast = data.list;
    let forecastHtml = '<p>5 Day Forecast:</p><ul>';

    for (let i = 0; i < forecast.length; i += 8) {
        const date = forecast[i].dt_txt;
        const weather = forecast[i].weather[0].description;
        const temperatureKelvin = forecast[i].main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;

        forecastHtml += `<li>${date}: ${weather}, ${temperatureCelsius.toFixed(2)} &#8451;</li>`;
    }

    forecastHtml += '</ul>';
    weatherInfo.innerHTML += forecastHtml;
}

