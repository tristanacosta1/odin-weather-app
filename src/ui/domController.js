import { getWeather } from "../api/weather.js";
import { isOnlyWhitespace } from "../utils/validation.js";
import { toggleUs } from "../logic/weatherModel.js";
import Sunny from "../assets/icons/sunny.svg?raw";
import Moonny from "../assets/icons/moonny.svg?raw";
import PartlyCloudy from "../assets/icons/partly-cloudy.svg?raw";
import PartlyCloudNight from "../assets/icons/partly-cloudy-night.svg?raw";
import Rainy from "../assets/icons/rainy.svg?raw";
import Thunderstorm from "../assets/icons/thunderstorm.svg?raw";
import Wind from "../assets/icons/wind.svg?raw";
import Humidity from "../assets/icons/humidity.svg?raw";
import Location from "../assets/icons/location.svg?raw";

const bg = document.getElementById("bg");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const location = document.getElementById("location");
const startView = document.getElementById("start-view");
const weatherView = document.getElementById("weather-view");
const currTemp = document.querySelector(".current .temp");
const currCond = document.querySelector(".current .condition");
const details = document.querySelectorAll(".details .value");
const place = document.getElementById("place");
const date = document.getElementById("date");
const days = document.querySelectorAll(".day");
const searchView = document.getElementById("search-view");

const icons = {
    sunny: Sunny,
    moonny: Moonny,
    partlyCloudy: PartlyCloudy,
    partlyCloudyNight: PartlyCloudNight,
    rainy: Rainy,
    thunderstorm: Thunderstorm,
    wind: Wind,
    humidity: Humidity,
    location: Location,
};

let cleanData;

export function initialize() {
    bg.innerHTML = icons.sunny;
    wind.innerHTML = icons.wind;
    humidity.innerHTML = icons.humidity;
    location.innerHTML = icons.location;
    currTemp.addEventListener("click", toggleUs);
    location.addEventListener("click", () => searchView.showModal());
}

export function searchWeather() {
    const placeIn = document.getElementById("place-input");
    const searchBtn = document.getElementById("search-button");

    placeIn.addEventListener("input", () => {
        if (isOnlyWhitespace(placeIn.value)) {
            placeIn.setCustomValidity("Place can't be blank.");
        } else {
            placeIn.setCustomValidity("");
        }
    });

    searchBtn.addEventListener("click", async () => {
        if (!placeIn.checkValidity()) {
            placeIn.reportValidity();
        } else {
            const cleanPlace = placeIn.value.trim();
            cleanData = await getWeather(cleanPlace);
            console.log(cleanData);
            startView.classList.add("hidden");
            weatherView.classList.remove("hidden");
            displayCurrent(cleanData.current);
            displayHeader(cleanData.header);
            displayDaily(cleanData.daily);
        }
    });
}

function setCurrIcon() {}

function displayCurrent(data) {
    currTemp.textContent = data.temp;
    currCond.textContent = data.condition;
    details[0].textContent = data.wind;
    details[1].textContent = data.humidity;
}

function displayHeader(data) {
    place.textContent = data.city;
    date.textContent = `(${data.day}, ${data.date})`;
}

function displayDaily(data) {
    days.forEach((day, index) => {
        day.querySelector(".dotw").textContent = data[index].day;
        day.querySelector(".condition").textContent = data[index].condition;
        day.querySelector(".temp").textContent = data[index].temp;
    });
}

const dayIcons = document.querySelectorAll(".day-icon");
