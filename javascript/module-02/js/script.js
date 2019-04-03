'use strict';

// 1. Домашнее задание
// Напиши скрипт со следующим функционалом:

// При загрузке страницы пользователю предлагается в prompt ввести число.
// Ввод сохраняется в переменную input и добавляется в массив чисел numbers.
// Операция ввода числа пользователем и сохранение в массив продолжается до тех пор,
// пока пользователь не нажмет Cancel в prompt. Используй бесконечный цикл с прерыванием.
// После того как пользователь прекратил ввод нажав Cancel, если массив не пустой,
// необходимо посчитать сумму всех элементов массива и записать ее в переменную total.
// Используй цикл for или for...of. После чего выведи alert с текстом 'Общая сумма чисел равна [сумма]'.
// 🔔 Делать проверку того, что пользователь ввел именно число, а не произвольный набор символов, не обязательно.
// Если хочешь, в случае некорректного ввода, показывай alert с текстом 'Было введено не число, попробуйте еще раз',
// при этом результат prompt записывать в массив чисел не нужно, после чего снова пользователю предлагается ввести число в prompt.

let input;
const numbers = [];
let total = 0;

while (true) {
  input = prompt('Введите число');

  if (input === null) break;

  input = Number(input);

  if (Number.isNaN(input)) {
    alert('Было введено не число, попробуйте еще раз');
  } else {
    numbers.push(input);
  }
}

if (numbers.length > 0) {
  for (const number of numbers) {
    total += number;
  }
  alert(`Общая сумма чисел равна ${total}`);
}

// 2. Дополнительное задание
// ⚠️ ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

// Напиши скрипт имитирующий авторизацию пользователя.

// Есть массив паролей зарегистрированных пользователей passwords.
// При посещении страницы, необходимо попросить пользователя ввести свой пароль,
// после чего проверить содержит ли массив passwords пароль введенный пользователем.
// Пароль можно ввести не верно всего n раз, кол-во хранится в переменной attempts.
// Подсказка: используйте цикл do...while.
// Если был введен пароль который есть в массиве passwords,
// вывести alert с текстом 'Добро пожаловать!' и прекратить спрашивать пароль в цикле.
// Если был введен не существующий пароль, отнять от лимита попыток единицу,
// вывести alert с текстом 'Неверный пароль, у вас осталось n попыток', где n это оставшийся лимит.
// После того как пользователь закрыл alert, запросить пароль снова.
// Продолжать запрашивать пароль до тех пор, пока пользователь не введет существующий пароль,
// не кончатся попытки или пока пользователь не нажмет Cancel в prompt.
// Если закончились попытки, вывести alert с текстом 'У вас закончились попытки, аккаунт заблокирован!'
// Если пользователь нажмет Cancel, прекратить выполнение цикла.

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;

do {
  const userPassword = prompt('Введите свой пароль, пожалуйста');

  attempts -= 1;

  if (userPassword === null) break;

  if (passwords.includes(userPassword)) {
    alert('Добро пожаловать!');
    break;
  } else if (attempts > 0) {
    alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
  } else {
    alert('У вас закончились попытки, аккаунт заблокирован!');
  }
} while (attempts > 0);