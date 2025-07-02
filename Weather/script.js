const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("magnify");
const cityInput = document.querySelector(".city h2");
const degree = document.querySelector(".degree h1");
const state = document.querySelector(".state h4");
const wind = document.querySelector(".wind-value");
const humidity = document.querySelector(".humidity-value");
const key = "f264164c0309550e316b0a3415a3173c";
const icon = document.querySelector(".weather-icon");

const windCont = document.querySelector(".wind");
const HumCont = document.querySelector(".humidity");
///////////////////////////////////////////////////////////////////////
async function getWeather() {
  try {
    const city = searchInput.value.toLowerCase();

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    console.log(response);
    if (!response.ok) {
      throw new error(error);
    }
    const data = await response.json();

    const country = data.sys.country;
    console.log(data);
    degree.textContent = `${data.main.feels_like}°C`;
    cityInput.textContent = `${data.name}, ${country}`;
    searchInput.value = "";
    state.textContent = data.weather[0].main;
    wind.textContent = `${data.wind.speed} m/h`;
    humidity.textContent = `${data.main.humidity}%`;
    state.style.marginTop = "2rem";

    setDisplay(
      [degree, state, wind, humidity, cityInput, windCont, HumCont],
      "flex"
    );
    err.style.display = "none";

    ////////////////////////////////////////////////////////////////////////////////////////
    switch (data.weather[0].main) {
      case "Clouds":
        icon.src = "/img/wathers/cloudy.png";
        break;
      case "Snow":
        icon.src = "/img/wathers/snowing_1585388.png";
        break;
      case "Clear":
        icon.src = "/img/wathers/sunny_17908097.png";
        break;
      case "Storm":
        icon.src = "/img/wathers/storm_1113817.png";
        break;
      case "Rain":
        icon.src = "/img/wathers/rainy.png";
        break;
      case "Overcast":
        icon.src = "/img/wathers/overcast_11660605.png";
        break;
      default:
        icon.src = "/img/wathers/cloud-data_5213117.png";
        break;
    }
  } catch (error) {
    const err = document.getElementById("err");
    searchInput.value = "";

    err.innerHTML = "Must have been the wind!! can't find your location";

    setDisplay(
      [degree, state, wind, humidity, cityInput, windCont, HumCont],
      "none"
    );
    err.style.display = "block";
    icon.src = "/img/wathers/cloud-data_5213117.png";
    icon.style.marginTop = "4rem";
  }
}

function setDisplay(elements, value) {
  elements.forEach((el) => {
    if (el) el.style.display = value;
  });
}

searchBtn.addEventListener("click", getWeather);

async function AutoWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    );
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    const country = data.sys.country;
    degree.textContent = `${data.main.feels_like}°C`;
    cityInput.textContent = `${data.name}, ${country}`;
    state.textContent = data.weather[0].main;
    wind.textContent = `${data.wind.speed} m/h`;
    humidity.textContent = `${data.main.humidity}%`;
    state.style.marginTop = "2rem";
    setDisplay(
      [degree, state, wind, humidity, cityInput, windCont, HumCont],
      "flex"
    );
    err.style.display = "none";
    switch (data.weather[0].main) {
      case "Clouds":
        icon.src = "/img/wathers/cloudy.png";
        break;
      case "Snow":
        icon.src = "/img/wathers/snowing_1585388.png";
        break;
      case "Clear":
        icon.src = "/img/wathers/sunny_17908097.png";
        break;
      case "Storm":
        icon.src = "/img/wathers/storm_1113817.png";
        break;
      case "Rain":
        icon.src = "/img/wathers/rainy.png";
        break;
      case "Overcast":
        icon.src = "/img/wathers/overcast_11660605.png";
        break;
      default:
        icon.src = "/img/wathers/cloud-data_5213117.png";
        break;
    }
  } catch (error) {
    const err = document.getElementById("err");
    err.innerHTML = "Could not get your location.";
    setDisplay(
      [degree, state, wind, humidity, cityInput, windCont, HumCont],
      "none"
    );
    err.style.display = "block";
    icon.src = "/img/wathers/cloud-data_5213117.png";
    icon.style.marginTop = "4rem";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        AutoWeather(position.coords.latitude, position.coords.longitude);
      },
      function (error) {
        err.innerHTML = "Could not get your location.";
      }
    );
  }
});
