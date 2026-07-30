export function createWeatherModel(weatherData) {
    const date = weatherData.days[0].datetime;
    const d = new Date(date);

    const formatDate = d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });

    const day = d.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const temp = Math.round(weatherData.currentConditions.temp);

    const condition = weatherData.currentConditions.conditions;

    const wind = weatherData.currentConditions.windspeed;

    const humidity = weatherData.currentConditions.humidity;


    return {
        header: {
            city: weatherData.address,
            date: formatDate,
            day,
        },
        current: {
            temp,
            condition,
            wind,
            humidity,
        },
        daily: ,
    };
}
