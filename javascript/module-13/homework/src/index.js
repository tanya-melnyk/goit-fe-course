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

// show current weather by user geoposition
function showWeatherByUserPosition(location) {
  spinner.show();

  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  fetchWeather(`${latitude},${longitude}`)
    .then(weather => {
      spinner.hide();
      renderWeather(weather);
    })
    .catch(error =>
      PNotify.error('Не удалось определить ваше местонахождения.'),
    );
}

// show current weather by user input
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', showWeatherByCityName);

function showWeatherByCityName(e) {
  e.preventDefault();

  spinner.show();

  const form = e.currentTarget;
  const cityName = form.children.city.value;

  fetchWeather(cityName)
  .then(weather => {
    spinner.hide();
    renderWeather(weather);
  })
    .catch(error => {
      PNotify.error('Введите правильное имя города.');
      spinner.hide();
    })
}
