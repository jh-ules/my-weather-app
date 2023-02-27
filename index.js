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

let currentTime = document.querySelector("#current-day");
currentTime.innerHTML = `${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function showWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherDetail = document.querySelector("#description");
  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  weatherDetail.innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
