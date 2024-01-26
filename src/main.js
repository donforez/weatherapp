import { getWeatherByCity } from './apiService.js';
const viewElems = {};

const getDOMElem = id => {
    return document.getElementById(id);
}

const connectHTMLElems = () => {
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');

    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');

    viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
    viewElems.returnToSearchBtn.addEventListener('click', returnToSearch);
}

const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        fadeInOut();
        let query = viewElems.searchInput.value; 
        getWeatherByCity(query).then(data => {
            displayWeatherData(data);
        });
    }
};

const onClickSubmit = () => {
    fadeInOut();
    let query = viewElems.searchInput.value; 
    getWeatherByCity(query).then(data => {
        displayWeatherData(data);
    });
};

const displayWeatherData = data => {
    switchView();
    fadeInOut();

    const weather = data.current;
    const forecast = data.forecast.forecastday[0].day;
    
    viewElems.weatherCity.innerText = data.location.name;
    viewElems.weatherIcon.src = data.current.condition.icon;
    viewElems.weatherIcon.alt = weather.condition.text;

    const currTemp = weather.temp_c;
    const maxTemp = forecast.maxtemp_c;
    const minTemp = forecast.mintemp_c;

    viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`;
    viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`;
    viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`;
}

const fadeInOut = () => {
    if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
        viewElems.mainContainer.style.opacity = '0';
    } else {
        viewElems.mainContainer.style.opacity = '1';
    }
}

const switchView = () => {
    if (viewElems.weatherSearchView.style.display !== 'none') {
        viewElems.weatherSearchView.style.display = 'none';
        viewElems.weatherForecastView.style.display = 'block';
    } else {
        viewElems.weatherForecastView.style.display = 'none';
        viewElems.weatherSearchView.style.display = 'flex';
    }
}

const returnToSearch = () => {
    fadeInOut();

    setTimeout(() => {
        switchView();
        fadeInOut();
    }, 500);
}

document.addEventListener('DOMContentLoaded', initializeApp);
