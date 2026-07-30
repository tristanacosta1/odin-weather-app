import { getWeather } from "../api/weather.js";
import { isOnlyWhitespace } from "../utils/validation.js";

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

    searchBtn.addEventListener("click", () => {
        if (!placeIn.checkValidity()) {
            placeIn.reportValidity();
        } else {
            const cleanPlace = placeIn.value.trim();
            getWeather(cleanPlace);
        }
    });
}
