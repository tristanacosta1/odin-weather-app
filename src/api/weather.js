export async function getWeather(location) {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=YNXBL2WSW3CTRMNYTGTG7UPNH&contentType=json`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const weatherData = await response.json();
        console.log(weatherData);
    } catch (error) {
        console.error(error.message);
    }
}
