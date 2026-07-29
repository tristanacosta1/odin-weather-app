export async function getWeather(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=YNXBL2WSW3CTRMNYTGTG7UPNH&contentType=json`;

    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
}

getWeather("Metro Manila");
