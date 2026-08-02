import { getWeather } from "../api/weather.js";
import { isOnlyWhitespace } from "../utils/validation.js";
import { toggleUs } from "../logic/weatherModel.js";
import clearDay from "../assets/icons/clear-day.svg?raw";
import clearNight from "../assets/icons/clear-night.svg?raw";
import cloudy from "../assets/icons/cloudy.svg?raw";
import partlyCloudyDay from "../assets/icons/partly-cloudy-day.svg?raw";
import partlyCloudNight from "../assets/icons/partly-cloudy-night.svg?raw";
import rain from "../assets/icons/rain.svg?raw";
import fog from "../assets/icons/fog.svg?raw";
import snow from "../assets/icons/snow.svg?raw";
import wind from "../assets/icons/wind.svg?raw";
import humidity from "../assets/icons/humidity.svg?raw";
import location from "../assets/icons/location.svg?raw";

const bg = document.getElementById("bg");
const windIcon = document.getElementById("wind");
const humidityIcon = document.getElementById("humidity");
const locationIcon = document.getElementById("location");
const startView = document.getElementById("start-view");
const weatherView = document.getElementById("weather-view");
const currTemp = document.querySelector(".current .temp");
const currCond = document.querySelector(".current .condition");
const details = document.querySelectorAll(".details .value");
const place = document.getElementById("place");
const date = document.getElementById("date");
const days = document.querySelectorAll(".day");
const hours = document.querySelectorAll(".hour");
const searchView = document.getElementById("search-view");

const icons = {
    wind,
    humidity,
    location,
    conditions: {
        "clear-day": clearDay,
        "clear-night": clearNight,
        "partly-cloudy-day": partlyCloudyDay,
        "partly-cloudy-night": partlyCloudNight,
        cloudy: cloudy,
        fog: fog,
        rain: rain,
        snow: snow,
        wind: wind,
    },
};

let metricData;
let usData;
let place;

export function initialize() {
    bg.innerHTML = icons.conditions["clear-day"];
    windIcon.innerHTML = icons.wind;
    humidityIcon.innerHTML = icons.humidity;
    locationIcon.innerHTML = icons.location;
    currTemp.addEventListener("click", toggleUs);
    locationIcon.addEventListener("click", () => searchView.showModal());
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
            place = placeIn.value.trim();
            metricData = await getWeather(place);
            console.log("Clean weather data: ", metricData);
            startView.classList.add("hidden");
            weatherView.classList.remove("hidden");
            displayCurrent(metricData.current);
            displayHeader(metricData.header);
            displayDaily(metricData.daily);
            displayHourly(metricData.hourly);
            setCurrIcon(metricData.current.icon);
        }
    });
}

function setCurrIcon(condition) {
    bg.innerHTML = icons.conditions[condition];
}

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
        day.querySelector(".icon").innerHTML = icons.conditions[data[index].icon];
    });
}

function displayHourly(data) {
    hours.forEach((hour, index) => {
        hour.querySelector(".temp").textContent = data[index].temp;
        hour.querySelector(".time").textContent = data[index].time;
    });
}
