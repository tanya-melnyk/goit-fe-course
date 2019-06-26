'use strict';

const container = document.querySelector('#task-4');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = document.querySelector('.result-4');
const API_base = 'http://api.apixu.com/v1/forecast.json';
const key = '?key=4a502c918a8341f7b27123556192606';
const params = '&days=3&lang=uk';

form.addEventListener('submit', fetchWeather);

function fetchWeather(e) {
  e.preventDefault();

  const search = `&q=${input.value}`;

  fetch(API_base + key + search + params)
    .then(response => response.json())
    .then(weather => {
      renderWeatherForecast(weather.forecast.forecastday);
    });
}

function renderWeatherForecast(forecastdays) {
  console.log(forecastdays);
  const markup = forecastdays.reduce((str, forecastday) => {
    return (
      str +
      `<div>
       <p>${forecastday.date}</p>
       <p>Max. temp - ${forecastday.day.maxtemp_c}&deg;C</p>
       <p>Min. temp - ${forecastday.day.mintemp_c}&deg;C</p>
       <p>${forecastday.day.condition.text}</p>
       <img src=${
         forecastday.day.condition.icon
       } alt="forecastday.day.condition.text" width="50">
      </div>`
    );
  }, '');

  result.innerHTML = markup;
}
