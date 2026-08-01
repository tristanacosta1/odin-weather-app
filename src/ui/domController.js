import { getWeather } from "../api/weather.js";
import { isOnlyWhitespace } from "../utils/validation.js";

const startView = document.getElementById("start-view");
const weatherView = document.getElementById("weather-view");
const currTemp = document.querySelector(".current .temp");
const currCond = document.querySelector(".current .condition");
const details = document.querySelectorAll(".details .value");
const place = document.getElementById("place");
const date = document.getElementById("date");

let cleanData;

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
        }
    });
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
