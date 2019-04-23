'use strict';

// Исходные данные
// Массив всех пользователей для задания.

const users = [
  {
    id: '701b29c3-b35d-4cf1-a5f6-8b12b29a5081',
    name: 'Moore Hensley',
    email: 'moorehensley@indexia.com',
    eyeColor: 'blue',
    friends: ['Sharron Pace'],
    isActive: false,
    balance: 2811,
    skills: ['ipsum', 'lorem'],
    gender: 'male',
    age: 37,
  },
  {
    id: '7a3cbd18-57a1-4534-8e12-1caad921bda1',
    name: 'Sharlene Bush',
    email: 'sharlenebush@tubesys.com',
    eyeColor: 'blue',
    friends: ['Briana Decker', 'Sharron Pace'],
    isActive: true,
    balance: 3821,
    skills: ['tempor', 'mollit', 'commodo', 'veniam', 'laborum'],
    gender: 'female',
    age: 34,
  },
  {
    id: '88beb2f3-e4c2-49f3-a0a0-ecf957a95af3',
    name: 'Ross Vazquez',
    email: 'rossvazquez@xinware.com',
    eyeColor: 'green',
    friends: ['Marilyn Mcintosh', 'Padilla Garrison', 'Naomi Buckner'],
    isActive: false,
    balance: 3793,
    skills: ['nulla', 'anim', 'proident', 'ipsum', 'elit'],
    gender: 'male',
    age: 24,
  },
  {
    id: '249b6175-5c30-44c6-b154-f120923736f5',
    name: 'Elma Head',
    email: 'elmahead@omatom.com',
    eyeColor: 'green',
    friends: ['Goldie Gentry', 'Aisha Tran'],
    isActive: true,
    balance: 2278,
    skills: ['adipisicing', 'irure', 'velit'],
    gender: 'female',
    age: 21,
  },
  {
    id: '334f8cb3-eb04-45e6-abf4-4935dd439b70',
    name: 'Carey Barr',
    email: 'careybarr@nurali.com',
    eyeColor: 'blue',
    friends: ['Jordan Sampson', 'Eddie Strong'],
    isActive: true,
    balance: 3951,
    skills: ['ex', 'culpa', 'nostrud'],
    gender: 'male',
    age: 27,
  },
  {
    guid: '150b00fb-dd82-427d-9faf-2879ea87c695',
    name: 'Blackburn Dotson',
    email: 'blackburndotson@furnigeer.com',
    eyeColor: 'brown',
    friends: ['Jacklyn Lucas', 'Linda Chapman'],
    isActive: false,
    balance: 1498,
    skills: ['non', 'amet', 'ipsum'],
    gender: 'male',
    age: 38,
  },
  {
    id: 'e1bf46ab-7168-491e-925e-f01e21394812',
    name: 'Sheree Anthony',
    email: 'shereeanthony@kog.com',
    eyeColor: 'brown',
    friends: ['Goldie Gentry', 'Briana Decker'],
    isActive: true,
    balance: 2764,
    skills: ['lorem', 'veniam', 'culpa'],
    gender: 'female',
    age: 39,
  },
];

// Используя массив объектов пользователей users (дальше в задании),
// напиши функции которые с помощью перебирающих методов массивов
// (никаких for, splice и т. д.) выполняют следующие операции.

// 1.1. Задание 1
// Получить массив имен всех пользователей (поле name).

const getAllNames = users => users.map(user => user.name);

console.log(getAllNames(users));
// [ 'Moore Hensley', 'Sharlene Bush', 'Ross Vazquez', 'Elma Head', 'Carey Barr', 'Blackburn Dotson', 'Sheree Anthony' ]

// 1.2. Задание 2
// Получить массив объектов пользователей по цвету глаз (поле eyeColor).

const getUsersByEyeColor = (users, color) =>
  users.filter(user => user.eyeColor === color);

console.log(getUsersByEyeColor(users, 'blue'));
// [объект Moore Hensley, объект Sharlene Bush, объект Carey Barr]

// 1.3. Задание 3
// Получить массив имен пользователей по полу (поле gender).

const getUsersByGender = (users, gender) =>
  users.filter(user => user.gender === gender);

console.log(getUsersByGender(users, 'male'));
// [ 'Moore Hensley', 'Ross Vazquez', 'Carey Barr', 'Blackburn Dotson' ]

// 1.4. Задание 4
// Получить массив только неактивных пользователей (поле isActive).

const getInactiveUsers = users => users.filter(user => !user.isActive);

console.log(getInactiveUsers(users));
// [объект Moore Hensley, объект Ross Vazquez, объект Blackburn Dotson]

// 1.5. Задание 5
// Получить пользоваля (не массив) по email (поле email, он уникальный).

const getUserByEmail = (users, email) =>
  users.find(user => user.email === email);

console.log(getUserByEmail(users, 'shereeanthony@kog.com'));
// {объект пользователя Sheree Anthony}
console.log(getUserByEmail(users, 'elmahead@omatom.com'));
// {объект пользователя Elma Head}

// 1.6. Задание 6
// Получить массив пользователей попадающих в возрастную категорию от min до max лет
// (поле age).

const getUsersWithAge = (users, min, max) =>
  users.filter(user => user.age >= min && user.age <= max);

console.log(getUsersWithAge(users, 20, 30));
// [объект Ross Vazquez, объект Elma Head, объект Carey Barr]
console.log(getUsersWithAge(users, 30, 40));
// [объект Moore Hensley, объект Sharlene Bush, объект Blackburn Dotson, объект Sheree Anthony]

// 1.7. Задание 7
// Получить общую сумму баланса (поле balance) всех пользователей.

const getTotalBalance = users =>
  users.reduce((sum, user) => sum + user.balance, 0);

console.log(getTotalBalance(users)); // 20916

// 1.8. Задание 8
// Массив имен всех пользователей у которых есть друг с указанным именем.

const getUsersByFriend = (users, name) =>
  users.filter(user => user.friends.includes(name));

console.log(getUsersByFriend(users, 'Briana Decker'));
// [ 'Sharlene Bush', 'Sheree Anthony' ]
console.log(getUsersByFriend(users, 'Goldie Gentry'));
// [ 'Elma Head', 'Sheree Anthony' ]

// 3. Дополнительное задание
// ⚠️ ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

// Получить массив всех умений всех пользователей (поле skills),
// при этом не должно быть повторяющихся умений
// и они должны быть отсортированы в алфавитном порядке

const leaveUniqueSkills = (skills, skill) => {
  if (!skills.includes(skill)) {
    skills.push(skill);
  }
  return skills;
};

const getUniqueSkills = users =>
  users
    .reduce((skills, user) => {
      skills.push(...user.skills);
      return skills;
    }, [])
    .reduce(leaveUniqueSkills, [])
    .sort();

// alternative

// const getUniqueSkills = users =>
//   users
//   .map(user => user.skills)
//   .join()
//   .split(',')
//   .reduce(leaveUniqueSkills, [])
//   .sort();

console.log(getUniqueSkills(users));
// [ 'adipisicing', 'amet', 'anim', 'commodo', 'culpa', 'elit',
// 'ex', 'ipsum', 'irure', 'laborum', 'lorem', 'mollit', 'non',
// 'nostrud', 'nulla', 'proident', 'tempor', 'velit', 'veniam' ]

// Массив имен (поле name) людей,
// отсортированных в зависимости от количества их друзей (поле friends)

const getNamesSortedByFriendsCount = users =>
  users
    .sort((a, b) => a.friends.length - b.friends.length)
    .map(user => user.name);

console.log(getNamesSortedByFriendsCount(users));
// [ 'Moore Hensley', 'Sharlene Bush', 'Elma Head', 'Carey Barr',
// 'Blackburn Dotson', 'Sheree Anthony', 'Ross Vazquez' ]
