import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './domActions.js';

class WeatherApp {
    constructor() {
        this.viewElems = {}
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfId = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfId);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    handleSubmit = () => {
        if (event.type === 'click' || event.key === 'Enter') {
            this.fadeInOut();
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
                this.displayWeatherData(data);
                this.viewElems.searchInput.style.borderColor = 'black';
                this.viewElems.errorInput.innerText = '';
                this.viewElems.searchInput.value = '';
            }).catch(() => {
                this.fadeInOut();
                this.viewElems.searchInput.style.borderColor = 'red';
                this.viewElems.errorInput.innerText = 'Błędna Nazwa!';
                this.viewElems.searchInput.value = '';
            })
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }

    switchView = () => {
        if (this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'block';
        } else {
            this.viewElems.weatherForecastView.style.display = 'none';
            this.viewElems.weatherSearchView.style.display = 'flex';
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
    
        setTimeout(() => {
            this.switchView();
            this.fadeInOut();
        }, 500);
    }

    displayWeatherData = data => {
        this.switchView();
        this.fadeInOut();
    
        const weather = data.current;
        const forecast = data.forecast.forecastday[0].day;
        
        this.viewElems.weatherCity.innerText = data.location.name;
        this.viewElems.weatherIcon.src = data.current.condition.icon;
        this.viewElems.weatherIcon.alt = weather.condition.text;
    
        const currTemp = weather.temp_c;
        const maxTemp = forecast.maxtemp_c;
        const minTemp = forecast.mintemp_c;
    
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`;
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp);
