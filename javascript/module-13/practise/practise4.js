'use strict';

/*
  Документация API: https://jsonplaceholder.typicode.com/

  Написать функцию getUserById, которая посылает запрос 
  на получение информации о пользоватеьте с id (число) введенным в input. 
  Не забывайте что значение input это строка.
 
  Объект что придет в ответе используйте для вывода информации
  о пользователе в элементе .result
  
  Если пользователя с таким идентификатором в базе данных нет,
  в элемент .result вывести строку "Ошибка! Пользователя с таким id не существует"
*/

const container = document.querySelector('#task-4');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = container.querySelector('.result');
const API_URL = 'https://jsonplaceholder.typicode.com/users/';

form.addEventListener('submit', getUserById);

function getUserById(evt) {
  evt.preventDefault();

  const id = Number(input.value);

  fetch(API_URL + id)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(user => printUserData(user))
    .catch(
      () => (result.textContent = 'Error! There is no user with given ID'),
    );
}

function printUserData(user) {
  console.log(user);

  const markup = `
  <table style="text-align: left">
    <tbody>
      <tr>
        <th>User ID: &emsp;</th>
        <td>${user.id}</td>
      </tr>
      <tr>
        <th>User name: &emsp;</th>
        <td>${user.username}</td>
      </tr>
      <tr>
        <th>Phone number: &emsp;</th>
        <td>${user.phone}</td>
      </tr>
    </tbody>
  </table>`;

  result.innerHTML = markup;
}
