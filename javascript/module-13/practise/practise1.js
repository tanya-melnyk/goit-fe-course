'use strict';

/*
  Написать функцию fetchCountryData, которая использует
  API_URL + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://restcountries.eu/rest/v2/name/имя-страны
    
  С помощью fetch сделать запрос по составленому адресу. 
  Обязательно обработать вариант с ошибкой запроса используя catch. 
  
  Результат запроса вывести в поле result в формате:
    Country name: имя страны
    Capital: столица
    Main currency: название денежной единицы
    Flag: флаг страны
  
  Все необходимые данные есть в ответе от API.
  
  PS: при отправке формы перезагружается страница,
  решите эту задачу вспомнив о том, как остановить
  поведение по умолчанию.
*/

const container = document.querySelector('#task-1');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = container.querySelector('.result');
const API_URL = 'https://restcountries.eu/rest/v2/name/';

form.addEventListener('submit', fetchCountryData);

/*
  @param {FormEvent} evt
*/
function fetchCountryData(evt) {
  evt.preventDefault();

  const country = input.value;

  getCountryData(country).then(printResult);
}

function getCountryData(country) {
  return fetch(`${API_URL}${country}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(countries => countries[0])
    .catch(error => console.error('Error: ', error));
}

function printResult(country) {
  const markup = `
  <table style="text-align: left">
    <tbody>
      <tr>
        <th>Country name: &emsp;</th>
        <td>${country.name}</td>
      </tr>
      <tr>
        <th>Capital: &emsp;</th>
        <td>${country.capital}</td>
      </tr>
      <tr>
        <th>Main currency: &emsp;</th>
        <td>${country.currencies[0].name}</td>
      </tr>
      <tr>
        <th>Flag: &emsp;</th>
        <td>
          <img src=${country.flag} alt="Flag of ${country.name}" width="100">
        </td>
      </tr>
    </tbody>
  </table>`;

  // const markup = `
  // <p> Country name: ${country.name}</p>
  // <p>Capital: ${country.capital}</p>
  // <p>Main currency: ${country.currencies[0].name}</p>
  // <p>Flag: </p>
  // <img src=${country.flag} alt="Flag of ${country.name}" width="200">`;

  result.innerHTML = markup;
}
