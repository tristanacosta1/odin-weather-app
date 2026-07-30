export function searchWeather() {
    const placeIn = document.getElementById("place-input");
    const searchBtn = document.getElementById("search-button");

    if (!placeIn.checkValidity()) {
        placeIn.reportValidity();
    }

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
        }
    });
}

function isOnlyWhitespace(location) {
    return location.trim() === "" && location.length > 0;
}
