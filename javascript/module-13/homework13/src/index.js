'use strict';

import './styles.css';

import getGeoPosition from './js/getGeoPosition';
import fetchWeather from './js/fetchWeather';
import renderWeather from './js/renderWeather';
import spinner from './js/spinner';

import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';

// Set default PNotify styling.
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
PNotify.defaults.delay = 3000;

// Ask for user geoposition
getGeoPosition()
  .then(showWeatherByUserPosition)
  .catch(error =>
    PNotify.notice(
      'Нет прав доступа к геопозиции, используйте поиск по имени города.',
    ),
  );

// fetch current weather by user geoposition
function showWeatherByUserPosition(location) {
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;
  const coord = `${latitude},${longitude}`;
  const errorMsg = 'Не удалось определить ваше местонахождения.';

  getWeather(coord, errorMsg);
}

// fetch current weather by user input
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', showWeatherByCityName);

function showWeatherByCityName(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const cityName = form.children.city.value;
  const errorMsg = 'Введите правильное имя города.';

  getWeather(cityName, errorMsg);
}

// show current weather
function getWeather(query, errorMsg) {
  spinner.show();

  fetchWeather(query)
    .then(weather => {
      renderWeather(weather);
      spinner.hide();
    })
    .catch(error => {
      PNotify.error(errorMsg);
      spinner.hide();
    });
}
