'use strict';

/*
  Документация API: https://jsonplaceholder.typicode.com/

  Просмотр всех пользователей: https://jsonplaceholder.typicode.com/users/ 

  Написать функцию fetchUsers, которая посылает get запрос.
  Результатом fetch будет массив объектов.
  
  В таблицу .user-table добавить строки для каждого пользователя.
  Каждая строка состоит из 5-ти столбцов указанного формата.
  Кол-во строк будет такое как и кол-во объектов пользователей в ответе.
  
    Имя | Почта | Город | Вебсайт | Компания
    Имя | Почта | Город | Вебсайт | Компания
    и так далее для каждого пользователя...
*/

const container = document.querySelector('#task-3');
const form = container.querySelector('.search-form');
const userTable = container.querySelector('.users-table');
const API_URL = 'https://jsonplaceholder.typicode.com/users';

form.addEventListener('submit', fetchUsers);

/*
  @param {FormEvent} evt
*/
function fetchUsers(evt) {
  evt.preventDefault();

  getUsers().then(printUsersData);
}

function getUsers() {
  return fetch(API_URL)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(err => console.error('Error: ', err));
}

function printUsersData(users) {
  console.log(users);
  const tableHead = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Website</th>
        <th>Company name</th>
      </tr>
    </thead>`;

  const markup = users.map(user => createTableRow(user)).join('');

  userTable.innerHTML = tableHead + markup;
}

function createTableRow(user) {
  return `
  <tr>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.address.city}</td>
    <td>${user.website}</td>
    <td>${user.company.name}</td>
  </tr>`;
}
