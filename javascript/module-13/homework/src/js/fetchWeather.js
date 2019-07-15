'use strict';

const baseURL = 'https://api.apixu.com/v1';
const APImethod = '/current.json';
const APIkey = '?key=4a502c918a8341f7b27123556192606';

export default function fetchWeather(query) {
  const APIquery = `&q=${query}`;

  // return new Promise((resolve, reject) => {
  //   fetch(baseURL + APImethod + APIkey + APIquery)
  //     .then(response => resolve(response.json()))
  //     .catch(error => reject(new Error()));
  // });

  return fetch(baseURL + APImethod + APIkey + APIquery)
    .then(response => {
      if (response.ok) return response.json();

      throw new Error();
    })
    .catch(error => {
      throw new Error();
    });
}
