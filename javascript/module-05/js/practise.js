'use strict';

/*
  1
 * Расставь отсутствующие this в методах объекта account
 */

const account = {
  owner: 'Mango',
  balance: 24000,
  discount: 0.1,
  orders: ['order-1', 'order-2', 'order-3'],
  changeDiscount(value) {
    this.discount = value;
  },
  getOrders() {
    return this.orders;
  },
  addOrder(cost, order) {
    this.balance -= cost;
    this.orders.push(order);
  },
};

account.changeDiscount(0.15);
console.log(account.discount); // 0.15

const orders = account.getOrders();
console.log(orders); // ['order-1', 'order-2', 'order-3']

account.addOrder(5000, 'order-4');
console.log(account.balance); // 19000
console.log(account.orders); // ['order-1', 'order-2', 'order-3', 'order-4']

/*  
   2
 * Расставь отсутствующие this в конструкторе Account
*/

function Account(login, password, type = 'regular') {
  this.login = login;
  this.password = password;
  this.type = type;

  this.changePassword = function(newPassword) {
    this.password = newPassword;
  };

  this.getInfo = function() {
    console.log(`
      Login: ${this.login}, 
      Pass: ${this.password}, 
      Type: ${this.type}
    `);
  };
}

const mangoAccount = new Account('Mango', 'qwe123', 'premium');

console.log(mangoAccount.login); // 'Mango'
console.log(mangoAccount.password); // 'qwe123'
console.log(mangoAccount.type); // 'premium'

mangoAccount.changePassword('asdzxc');
console.log(mangoAccount.password); // 'asdzxc'

mangoAccount.getInfo(); // Login: 'Mango', Pass: 'asdzxc', Type: 'premium'

/*  
  3
  Напиши функцию-конструкор User для создания 
  пользователя со следующим свойствами:
    - name - строка (имя)
    - age - число (возраст)
    - friends - число (кол-во друзей)

  Имя, активность, возраст и друзей, 
  будут переданы при вызове конструктора User.
  
  Добавь метод getInfo(), который, выводит строку:
  `User ${имя} is ${возраст} years old and has ${кол-во друщзей} friends`
*/

const User = function({ name, age, friends }) {
  this.name = name;
  this.age = age;
  this.friends = friends;

  this.getInfo = function() {
    console.log(
      `User ${this.name} is ${this.age} years old and has ${
        this.friends
      } friends`,
    );
  };
};

// const User = function(obj) {
//   this.name = obj.name;
//   this.age = obj.age;
//   this.friends = obj.friends;

//   this.getInfo = function() {
//     console.log(
//       `User ${this.name} is ${this.age} years old and has ${
//         this.friends
//       } friends`,
//     );
//   };
// };

const mango = new User({ name: 'Mango', age: 2, friends: 20 });
mango.getInfo(); // User Mango is 2 years old and has 20 friends

const poly = new User({ name: 'Poly', age: 3, friends: 17 });
poly.getInfo(); // User Poly is 3 years old and has 17 friends

/*  
  4
 * Напиши конструктор Storage(items), который будет создавать объекты для управления складом товаров
 * При вызове будет получать один аргумент - начальный массив товаров, и записываеть его в свойство items
 *
 * Добавь метод getItems, который возвращает массив текущих товаров
 * Добавь метод addItem(item), который получает новый товар и добавляет его к текущим
 * Добавь метод removeItem(item), который получет товар и, если он есть, удаляет его из текущих
*/

const Storage = function(items) {
  this.items = items;

  this.getItems = function() {
    return this.items;
  };

  this.addItem = function(item) {
    this.items.push(item);
  };

  this.removeItem = function(item) {
    if (this.items.includes(item)) {
      const itemIdx = this.items.indexOf(item);
      this.items.splice(itemIdx, 1);
    }
  };
};

const storage = new Storage([
  'Нанитоиды',
  'Пролонгер',
  'Железные жупи',
  'Антигравитатор',
]);

const items = storage.getItems();
console.log(items); // [ "Нанитоиды", "Пролонгер", "Железные жупи", "Антигравитатор" ]

storage.addItem('Дроид');
console.log(storage.items); // [ "Нанитоиды", "Пролонгер", "Железные жупи", "Антигравитатор", "Дроид" ]

storage.removeItem('Пролонгер');
console.log(storage.items); // [ "Нанитоиды", "Железные жупи", "Антигравитатор", "Дроид" ]
