import "./styles/main.css";
import Sunny from "./assets/icons/sunny.svg";

const icon = document.querySelector("#icon");

fetch(Sunny)
    .then((response) => response.text())
    .then((svg) => {
        icon.innerHTML = svg;
    });
