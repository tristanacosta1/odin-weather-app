export function createWeatherModel(weatherData) {
    const date = weatherData.days[0].datetime;
    const d = new Date(date);
    const currHour = Number([weatherData.currentConditions.datetime.slice(0, 2)]);

    const formatDate = d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });

    const day = d.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const temp = Math.round(weatherData.currentConditions.temp) + "\u00B0" + "C";

    const condition = weatherData.currentConditions.conditions;

    const wind = weatherData.currentConditions.windspeed;

    const humidity = weatherData.currentConditions.humidity + "%";

    function extractDay(dayDay) {
        const d = new Date(dayDay.datetime);
        const day = d.toLocaleDateString("en-US", {
            weekday: "long",
        });
        const condition = dayDay.conditions;
        const temp = Math.round(dayDay.temp);

        return {
            day,
            condition,
            temp,
        };
    }

    function extractHour(hour) {
        const time = hour.datetime.slice(0, 5);
        const temp = Math.round(hour.temp);

        return {
            time,
            temp,
        };
    }

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
        daily: weatherData.days.slice(0, 7).map(extractDay),
        hourly: weatherData.days[0].hours.slice(currHour - 1, currHour + 7).map(extractHour),
    };
}
