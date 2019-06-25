'use strict';

/*
  Написать функцию fetchUserData, которая использует
  API_URL + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://api.github.com/users/имя-пользователя
    
  Документация по Git API:
    https://developer.github.com/v3/
    
  С помощью fetch сделать запрос по составленому адресу. 
  Обязательно обработать вариант с ошибкой запроса используя catch. 
  
  Результат запроса вывести в поле result в формате:
    Avatar: аватартка 
    Username: логин
    Bio: описание профиля
    Public repos: кол-во открытых репозиториев
  
  Все необходимые данные есть в ответе от API.
*/

const container = document.querySelector('#task-2');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = container.querySelector('.result');
const API_URL = 'https://api.github.com/users/';

form.addEventListener('submit', fetchUserData);

/*
  @param {FormEvent} evt
*/
function fetchUserData(evt) {
  evt.preventDefault();

  const userName = input.value;

  getUserData(userName).then(printResult);
}

function getUserData(user) {
  return fetch(`${API_URL}${user}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(err => console.error('Error: ', err));
}

function printResult(user) {
  console.log(user);

  const markup = `
  <table style="text-align: left">
    <tbody>
      <tr>
        <th>Avatar: &emsp;</th>
        <td>
          <img src=${user.avatar_url} alt="User ${user.name} Avatar" width="100">
        </td>
      </tr>
      <tr>
        <th>User name: &emsp;</th>
        <td>${user.name}</td>
      </tr>
      <tr>
        <th>Bio: &emsp;</th>
        <td>${user.bio}</td>
      </tr>
      <tr>
        <th>Public repos: &emsp;</th>
        <td>${user.public_repos}</td>
      </tr>
    </tbody>
  </table>`;

  result.innerHTML = markup;
}
