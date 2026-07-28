import "./styles/main.css";
import Sunny from "./assets/icons/sunny.svg?raw";
import Wind from "./assets/icons/wind.svg?raw";
import Humidity from "./assets/icons/humidity.svg?raw";
import Location from "./assets/icons/location.svg?raw";

const bg = document.getElementById("bg");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const location = document.getElementById("location");
const dayIcons = document.querySelectorAll(".day-icon");

const icons = {
    bg: Sunny,
    wind: Wind,
    humidity: Humidity,
    location: Location,
};

bg.innerHTML = icons.bg;
wind.innerHTML = icons.wind;
humidity.innerHTML = icons.humidity;
location.innerHTML = icons.location;

dayIcons.forEach((day) => {
    day.innerHTML = icons.bg;
});
