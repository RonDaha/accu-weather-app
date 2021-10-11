/* Convert temp from fahrenheit to celsius */
const calc = (f) => Math.floor((5/9) * (f - 32))
/* Enrich the forecastsData with celsius temperatures */
export const enrichData = (forecastsData) => {
    forecastsData.DailyForecasts = forecastsData.DailyForecasts.map(daily => {
        return {
            ...daily,
            tempF: {
                max: `${daily.Temperature.Maximum.Value} ${daily.Temperature.Maximum.Unit}`,
                min: `${daily.Temperature.Minimum.Value} ${daily.Temperature.Minimum.Unit}`
            },
            tempC: {
                max: `${calc(daily.Temperature.Maximum.Value)} C`,
                min: `${calc(daily.Temperature.Minimum.Value)} C`
            },
        }
    })
}
