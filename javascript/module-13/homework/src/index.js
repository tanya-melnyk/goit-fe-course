'use strict';

import './styles.css';
import getGeoPosition from './js/getGeoPosition';
import fetchWeather from './js/fetchWeather';
import renderWeather from './js/renderWeather';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';

import PNotifyStyleMaterial from '../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js';
// Set default styling.
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
PNotify.defaults.delay = 3000;

// ask user geoposition
getGeoPosition()
  .then(showWeatherByUserPosition)
  .catch(error =>
    PNotify.notice(
      'Нет прав доступа к геопозиции, используйте поиск по имени города.',
    ),
  );

// show current weather by user geoposition
function showWeatherByUserPosition(location) {
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  fetchWeather(`${latitude},${longitude}`)
    .then(renderWeather)
    .catch(error => console.log(error));
}

// show current weather by user input
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', showWeatherByCityName);

function showWeatherByCityName(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const cityName = form.children.city.value;

  fetchWeather(cityName)
    .then(renderWeather)
    .catch(error => PNotify.error('Введите правильное имя города.'));
}
