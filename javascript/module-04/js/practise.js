'use strict';

/*  
  1
  Напиши скрипт, который, для объекта user, последовательно: 
  
    - добавляет поле mood со значением 'happy'
    
    - заменяет значение hobby на 'javascript'
    
    - заменяет значение premium на false
    
    - выводит содержимое объекта user в формате ключ:значение 
      используя Object.keys и for...of
    
    - выводит содержимое объекта user в формате ключ:значение 
      используя Object.entries и for...of
*/

const user = {
  name: 'Mango',
  age: 20,
  hobby: 'html',
  premium: true,
};

user.mood = 'happy';
user.hobby = 'javascript';
user.premium = false;

const userKeys = Object.keys(user);

for (const key of userKeys) {
  const value = user[key];
  console.log(`${key}: ${value}`);
}

const userEntries = Object.entries(user);

for (const entry of userEntries) {
  const key = entry[0];
  const value = entry[1];
  console.log(`${key}: ${value}`);
}

/*
  2
  Напиши скрипт который определит и выведет в консоль 
  имя сотрудника который выполнил больше всех задач.

  Сотрудники и кол-во выполненых задач содержатся 
  как свойства объекта в формате "имя":"кол-во задач"
*/

const tasksCompleted = {
  ann: 29,
  david: 35,
  helen: 1,
  lorence: 99,
};

const findBestWorker = workersResults => {
  let bestWorker = '';

  for (const worker in workersResults) {
    let maxTaskCount = 0;

    if (workersResults[worker] > maxTaskCount) {
      maxTaskCount = workersResults[worker];
      bestWorker = worker;
    }
  }

  return console.log(`${bestWorker} выполнил больше всех задач!`);
};

findBestWorker(tasksCompleted);

/*  
  3
  Напиши функцию countProps(obj), считающую кол-во свойств в объекте.
  Функция возвращает количество свойств.
*/

function countProps(obj) {
  const objProps = Object.keys(obj);
  return objProps.length;
}

// Вызовы функции для проверки
console.log(countProps({})); // 0
console.log(countProps({ a: 1, b: 3, c: 'hello' })); // 3

/*  
  4
  Напиши функцию isObjectEmpty(obj), которая получает 
  один аргумент obj - объект, и проверяет пуст ли он (есть ли в нем свойства).
  
  Возвращает true если объект пустой, false если не пустой.
*/

const isObjectEmpty = obj => Object.keys(obj).length === 0;

// Вызовы функции для проверки
console.log(isObjectEmpty({})); // true
console.log(isObjectEmpty({ a: 1 })); // false
console.log(isObjectEmpty({ a: 1, b: 2 })); // false

/*  
  5
  Напиши функцию countTotalSalary(salaries). 
  
  Функция получает объект зарплат и считает общую сумму запрплаты работников.
  Возвращает общую сумму зарплаты.
  
  Каждое поле объекта, передаваемого в функцию, имеет вид "имя":"зарплата"
*/

const countTotalSalary = salaries => {
  let totalSalary = 0;

  for (const salary in salaries) {
    totalSalary += salaries[salary];
  }

  return totalSalary;
};

// Вызовы функции для проверки
console.log(countTotalSalary({})); // 0

console.log(
  countTotalSalary({
    mango: 100,
    poly: 150,
    alfred: 80,
  }),
); // 330

/*  
  6
  Напиши функцию getAllPropValues(arr, prop), 
  которая получает массив объектов и имя ключа. 
  Возвращает массив значений определенного поля prop
  из каждого объекта в массиве
*/

function getAllPropValues(arr, prop) {
  const propValues = [];

  for (const obj of arr) {
    if (obj[prop]) {
      propValues.push(obj[prop]);
    }
  }

  return propValues;
}

const users = [
  { name: 'Poly', age: 7, mood: 'happy' },
  { name: 'Mango', age: 4, mood: 'blissful' },
  { name: 'Ajax', age: 3, mood: 'tired' },
];

// Вызовы функции для проверки
console.log(getAllPropValues(users, 'name')); // ['Poly', 'Mango', 'Ajax']
console.log(getAllPropValues(users, 'mood')); // ['happy', 'blissful', 'tired']
console.log(getAllPropValues(users, 'active')); // []

/*
  7
* Есть два массива names и prices с именами и ценами товаров.
* Напишите функцию combine(names, prices), которая получает 
* эти два массива и возвращает массив объектов со свойствами name и price. 
*/

const combine = function(names, prices) {
  const productsPrices = [];

  for (let i = 0; i < names.length; i += 1) {
    productsPrices[i] = {
      name: names[i],
      price: prices[i],
    };
  }

  return productsPrices;
};

const names = [
  'Радар',
  'Сканер',
  'Дроид',
  'Захват',
  'Двигатель',
  'Топливный бак',
];
const prices = [1000, 2000, 1500, 2700, 1600, 8000];

const products = combine(names, prices);
console.log(products); // массив объектов со свойствами name и price
