let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = days[now.getDay()];

let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

let currentTime = document.querySelector("#current-date");
currentTime.innerHTML = `${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   
      <div class="col-4">
         <div class="forecast">
           <h6>${formatDay(forecastDay.dt)}</h6>
           <div class="weather-forecast-temperature">
             <span class="forecast-temperature-max">${Math.round(
               forecastDay.temp.max
             )}°</span>
             <span class="forecast-temperature-min">${Math.round(
               forecastDay.temp.min
             )}°</span>
           </div>
           <img
             src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png"
             alt="weather icon"
             width="60"
             id="forecast-icon"
           />
         </div>
       </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  let country = document.querySelector("#country");
  let currentTemperature = document.querySelector("#current-temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#current-humidity");
  let wind = document.querySelector("#wind-speed");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let currentIcon = document.querySelector("#current-icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  currentCity.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  sunrise.innerHTML = formatDate(response.data.sys.sunrise * 1000);
  sunset.innerHTML = formatDate(response.data.sys.sunset * 1000);
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function searchLocation(position) {
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Berlin");
