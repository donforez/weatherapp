export const getWeatherByCity = city => {
    return fetch(
        `http://api.weatherapi.com/v1/current.json?key=54bfc316749741d3bbe233723242501&q=${city}`
    )
    .then(resp => resp.json())
    .then(data => {
        const country = data.location.country;
        return fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=54bfc316749741d3bbe233723242501&q=${country}`
        ).then(resp => resp.json()).then(data => data);
    })
}
