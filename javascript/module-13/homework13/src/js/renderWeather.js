'use strict';

const refs = {
  weatherSection: document.getElementById('weather'),
  icon: document.querySelector('.icon'),
  location: document.querySelector('span[data-field="location"]'),
  temp: document.querySelector('span[data-field="temp"]'),
  humidity: document.querySelector('span[data-field="humidity"]'),
  wind: document.querySelector('span[data-field="wind"]'),
  conditions: document.querySelector('span[data-field="conditions"]'),
};

export default function renderWeather(weather) {
  refs.icon.src = weather.current.weather_icons[0];
  refs.location.textContent = weather.location.name;
  refs.temp.textContent = weather.current.temperature;
  refs.humidity.textContent = weather.current.humidity;
  refs.wind.textContent = weather.current.wind_speed;
  refs.conditions.textContent = weather.current.weather_descriptions;

  refs.weatherSection.classList.remove('is-hidden');
}
