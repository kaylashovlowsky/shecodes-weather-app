function weatherDisplay(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temperature-display");
  heading.innerHTML = `${temperature}°F`;
}

function enterCity(event) {
  event.preventDefault();
  let locationSearch = document.querySelector("#city-input");
  let display = document.querySelector("h1");

  let apiKey = "632a5d0f15a7053d4f021e44e4d50ed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationSearch.value}&appid=${apiKey}&units=imperial`;

  display.innerHTML = `${locationSearch.value}`;
  axios.get(apiUrl).then(weatherDisplay);
}

let form = document.querySelector("#location-input");
form.addEventListener("submit", enterCity);

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
