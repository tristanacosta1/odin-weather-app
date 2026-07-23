import "./styles/main.css";
import Sunny from "./assets/icons/sunny.svg";

const bg = document.querySelector("#bg");

fetch(Sunny)
    .then((response) => response.text())
    .then((svg) => {
        bg.innerHTML = svg;
    });
