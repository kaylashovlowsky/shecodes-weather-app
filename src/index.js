function displayWeatherElements(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temperature-display");
  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let windDisplay = document.querySelector("#wind-speed");
  let humidity = Math.round(response.data.main.humidity);
  let humidityDisplay = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  heading.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  windDisplay.innerHTML = `${wind} mph`;
  humidityDisplay.innerHTML = `${humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function enterCity(event) {
  event.preventDefault();
  let locationSearch = document.querySelector("#city-input");
  let display = document.querySelector("h1");
  let apiKey = "632a5d0f15a7053d4f021e44e4d50ed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationSearch.value}&appid=${apiKey}&units=metric`;

  display.innerHTML = `${locationSearch.value}`;
  axios.get(apiUrl).then(displayWeatherElements);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-display");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function search(city) {
  let apiKey = "632a5d0f15a7053d4f021e44e4d50ed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherElements);
}

function dailyForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  class="weather-icons-daily"
                  src="http://openweathermap.org/img/wn/10d@2x.png"
                  width="60"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-high">20°</span>
                  <span class="weather-forecast-temperature-low">10°</span>
                </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#location-input");
form.addEventListener("submit", enterCity);

let fahernheitLink = document.querySelector("#fahrenheit-link");
fahernheitLink.addEventListener("click", convertToFahrenheit);

dailyForecast();

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let today = document.querySelector("#date-display");
today.innerHTML = `${day} ${hour}:${minute}`;

navigator.geolocation.getCurrentPosition(enterCity);
