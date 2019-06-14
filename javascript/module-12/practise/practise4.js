'use strict';

/*
 * Перепиши функцию updateActiveState так, чтобы она
 * не использовала callback-функцию, а возвращала промис.
 */

// const updateActiveState = (users, callback) => {
//   const updatedUsers = users.map(user => ({ ...user, active: !user.active }));

//   callback(updatedUsers);
// };

// updateActiveState(users, console.table);

/*
 * Должно работать так
 *
 * updateActiveState(users).then(console.table);
 */

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const updateActiveState = users => {
  return new Promise(resolve => {
    resolve(users.map(user => ({ ...user, active: !user.active })));
  });
};

updateActiveState(users).then(console.table);
