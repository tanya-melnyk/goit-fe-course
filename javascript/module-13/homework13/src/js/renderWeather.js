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
  refs.icon.src = 'https:' + weather.current.condition.icon;
  refs.location.textContent = weather.location.name;
  refs.temp.textContent = weather.current.temp_c;
  refs.humidity.textContent = weather.current.humidity;
  refs.wind.textContent = weather.current.wind_kph;
  refs.conditions.textContent = weather.current.condition.text;

  refs.weatherSection.classList.remove('is-hidden');
}
