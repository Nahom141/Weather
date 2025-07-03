const key = "f264164c0309550e316b0a3415a3173c";

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("magnify");
const cityInput = document.querySelector(".city h2");
const degree = document.querySelector(".degree h1");
const state = document.querySelector(".state h4");
const wind = document.querySelector(".wind-value");
const humidity = document.querySelector(".humidity-value");
const icon = document.querySelector(".weather-icon");
const windCont = document.querySelector(".wind");
const humCont = document.querySelector(".humidity");
const err = document.getElementById("err");

function setDisplay(elements, value) {
  elements.forEach((el) => el && (el.style.display = value));
}

function getWeatherIcon(condition) {
  switch (condition) {
    case "Clouds":
      return "/img/wathers/cloudy.png";
    case "Snow":
      return "/img/wathers/snowing_1585388.png";
    case "Clear":
      return "/img/wathers/sunny_17908097.png";
    case "Storm":
      return "/img/wathers/storm_1113817.png";
    case "Rain":
      return "/img/wathers/rainy.png";
    case "Overcast":
      return "/img/wathers/overcast_11660605.png";
    default:
      return "/img/wathers/cloud-data_5213117.png";
  }
}

function renderWeather(data) {
  const { name, sys, main, weather, wind: windData } = data;

  degree.textContent = `${main.feels_like}°C`;
  cityInput.textContent = `${name}, ${sys.country}`;
  state.textContent = weather[0].main;
  wind.textContent = `${windData.speed} m/h`;
  humidity.textContent = `${main.humidity}%`;
  state.style.marginTop = "2rem";
  icon.src = getWeatherIcon(weather[0].main);
  icon.style.marginTop = "0";

  setDisplay(
    [degree, state, wind, humidity, cityInput, windCont, humCont],
    "flex"
  );
  err.style.display = "none";
}

function showError(message) {
  err.innerHTML = message;
  setDisplay(
    [degree, state, wind, humidity, cityInput, windCont, humCont],
    "none"
  );
  icon.src = getWeatherIcon("");
  icon.style.marginTop = "4rem";
  err.style.display = "block";
}

async function getWeather() {
  const city = searchInput.value.trim().toLowerCase();
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    renderWeather(data);
    searchInput.value = "";
  } catch (error) {
    searchInput.value = "";
    showError("Must have been the wind!! Can't find your location");
  }
}

async function autoWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    );
    if (!response.ok) throw new Error("Failed to fetch auto weather");

    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    showError("Could not get your location.");
  }
}

searchBtn.addEventListener("click", getWeather);
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        autoWeather(
          position.coords.latitude,
          position.coords.longitude
        ).style.transition = "0.3s";
      },
      () => {
        showError("Could not get your location.");
      }
    );
  }
});
