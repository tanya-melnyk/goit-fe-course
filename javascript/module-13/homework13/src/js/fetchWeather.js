'use strict';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'http://api.weatherstack.com';
const APImethod = '/current';
const APIkey = '?access_key=a2f4a19b05175ece9e4162c1948e6ca4';

export default function fetchWeather(query) {
  const APIquery = `&query=${query}`;

  return fetch(corsAnywhere + baseURL + APImethod + APIkey + APIquery)
    .then(response => {
      if (response.ok) return response.json();

      throw new Error('Place is not found');
    })
    .catch(error => {
      throw error;
    });
}
