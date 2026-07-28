import "./styles/main.css";
import Sunny from "./assets/icons/sunny.svg?raw";
import Wind from "./assets/icons/wind.svg?raw";
import Humidity from "./assets/icons/humidity.svg?raw";

const bg = document.getElementById("bg");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

const icons = {
    bg: Sunny,
    wind: Wind,
    humidity: Humidity,
};

bg.innerHTML = icons.bg;
wind.innerHTML = icons.wind;
humidity.innerHTML = icons.humidity;
