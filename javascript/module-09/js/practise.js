'use strict';

/*
  1
  Напишите скрипт который реализует следующий функционал.
  
  Есть кнопка с классом button, текст которой отображает 
  кол-во раз которое по ней кликнули, обновляется при каждом клике.
*/

const btn_1 = document.querySelector('.btn_1');
let counter = btn_1.textContent;

const countClicks = () => {
  counter = Number(counter) + 1;
  btn_1.textContent = counter;
};

btn_1.addEventListener('click', countClicks);

/*
  2
  Даны 2 инпута, абзац и кнопка. По нажатию на кнопку 
  получите числа которые бьудут введены в инпуты и запишите их сумму в span.result.
*/

const btn_2 = document.querySelector('button[data-action="add_2"]');

const showInputsSum = () => {
  const inputsBlock = document.querySelector('.expression');
  let [x, , y, , sum] = inputsBlock.children;
  x = Number(x.value);
  y = Number(y.value);
  sum.textContent = x && y ? x + y : 'Enter only the numbers';
};

btn_2.addEventListener('click', showInputsSum);

/*
  3
  Есть счетчик (спан) и кнопки +1, -1, 
  которые должны увеличивать и уменьшать значение счетчика на 1. 
  
  - Создайте класс Counter, 
    который хранит одно поле value - текущее значение счетчика

  - Класс принимает один параметр - onChange, 
    функцию для обновления интерфейса при изменении счетчика

  - Добавьте классу методы increment и decrement 
    для увеличения и ументшение значения счетчика

  - Привяжите вызовы методов и значение счетчика к раметке
*/

const counterValue = document.querySelector('.value');

function onChange(value) {
  counterValue.textContent = value;
}

class Counter {
  constructor(onChange) {
    this.onChange = onChange;
    this.value = 0;
  }

  increment() {
    this.value += 1;
    this.onChange(this.value);
  }

  decrement() {
    this.value -= 1;
    this.onChange(this.value);
  }
}

const counter_3 = new Counter(onChange);

const subBtn = document.querySelector('button[data-action="sub"]');
const addBtn = document.querySelector('button[data-action="add"]');

subBtn.addEventListener('click', counter_3.decrement.bind(counter_3));
addBtn.addEventListener('click', counter_3.increment.bind(counter_3));

/*
  4
  Есть форма с набором радиокнопок. 
  Пользователь выбирает вариант ответа, 
  после чего нажимает кнопку "Submit" и происходит отправка формы.
  
  При отправке формы:
    - не должна перезагружаться страница
    - необходимо получить выбранную опцию и вывести в параграф с классом .result
*/

const form = document.querySelector('.question-form');
const result = document.querySelector('.result_4');
const resultStrBeginning = result.textContent;
let userChoice = resultStrBeginning;

const getUserChoice = event => {
  const target = event.target;
  const label = target.parentNode;
  userChoice = resultStrBeginning + label.textContent;
};

const showUserChoice = event => {
  event.preventDefault();
  result.textContent = userChoice;
};

form.addEventListener('change', getUserChoice);
form.addEventListener('submit', showUserChoice);

/*
  5
  Дан список изображений. Сделайте так, чтобы по клику на картинку 
  алертом выводился ее src. Обязательно используйте делегирование событий.
*/

const gallery = document.querySelector('.images');

const showImgSrc = event => {
  const target = event.target;
  alert(target.getAttribute('src'));
};

gallery.addEventListener('click', showImgSrc);

/*
  6
  Дан ul, а внутри него произвольное количество li с текстом и кнопкой. 
  Сделайте так, чтобы по нажатию на кнопку, удалялся тот li в котором
  она находится. Обязательно используйте делегирование событий.
*/

const buttonsList = document.querySelector('.list');

const deleteButton = event => {
  const target = event.target;
  const li = target.parentNode;
  li.remove();
};

buttonsList.addEventListener('click', deleteButton);

/*
  7
  Дан набор инпутов. Сделайте так, чтобы при потере фокуса все 
  инпуты проверяли свое содержимое на правильное количество символов. 
  
  - Сколько символов должно быть в инпуте, указывается в атрибуте data-length. 
  - Если введено подходящее количество, то outline инпута становится зеленым, 
    если неправильное - красным. Для добавления стилей, на вкладке CSS есть стили valid и invalid
*/

const inputsList = document.querySelector('.input-list');

const checkCorrectness = event => {
  const target = event.target;
  const userInput = target.value;
  console.log(userInput);
  const input = target.textContent + userInput;
  console.log(input);
  const correctLength = target.getAttribute('data-length');

  // input.length === Number(correctLength)
  //   ? target.classList.add('valid')
  //   : target.classList.add('invalid');

  // added some code so user can correct his input after he saw the check result
  if (input.length === Number(correctLength)) {
    target.classList.contains('invalid')
      ? target.classList.replace('invalid', 'valid')
      : target.classList.add('valid');
    // target.classList.remove('invalid');
    // target.classList.add('valid');
  } else {
    target.classList.contains('valid')
      ? target.classList.replace('valid', 'invalid')
      : target.classList.add('invalid');
    // target.classList.remove('valid');
    // target.classList.add('invalid');
  }
};

inputsList.addEventListener('change', checkCorrectness);

/*
  8
  Напишите скрипт который:
    
    - При фокусе текстового поля, в p.message рендерит строку "Input is in focus!"
    - При наборе текста в инпуте (событие input), текущее его значение должно 
      отображаться в p.input-value 
*/

const message = document.querySelector('.message');
const input_8 = document.querySelector('.input_8');
const inputValue = document.querySelector('.input-value');
const inputValueStart = inputValue.textContent;

const reportFocusEvent = () => {
  message.textContent = 'Input is in focus!';
};

const showInputResult = () => {
  inputValue.textContent = `${inputValueStart} ${input_8.value}`;
};

input_8.addEventListener('focus', reportFocusEvent);
input_8.addEventListener('input', showInputResult);

/*
  9
  На вкладках HTML и CSS уже готовая верстка модального окна.
  По умолчанию модальное окно скрыто классом modal-hidden.
  
  Напишите скрипт который реализует следующее поведение:
 
  - При клике на кнопке с надписью "Open Modal", модальное окно с классом modal, 
    должно появляться. Для этого необходимо убрать класс modal-hidden. 
    Для выбора модального модального окна используйте класс js-modal-backdrop
 
  - При открытом модальном окне, клик на кнопку с крестиком (data-action="close-modal")
    или на серый фон с прозрачностью (js-modal-backdrop), модальное окно должно закрываться.
*/

// const openModalWindow = () => {
//   modalWindow.classList.remove('modal-hidden');
// };

// const closeModalWindow = () => {
//   modalWindow.classList.add('modal-hidden');
// };

const openModalBtn = document.querySelector('.btn_9');
const modalWindow = document.querySelector('.js-modal-backdrop');
const closeModalBtn = document.querySelector('.close-btn');

const toggleModalWindow = event => {
  event.stopPropagation();
  modalWindow.classList.toggle('modal-hidden');
};

openModalBtn.addEventListener('click', toggleModalWindow);
closeModalBtn.addEventListener('click', toggleModalWindow);
modalWindow.addEventListener('click', toggleModalWindow);

/*
  10
  Ознакомьтесь с HTML и CSS.
  
  Есть меню навигации, необходимо написать скрипт, который
  при клике на пункт меню добавит ему класс active,
  таким образом выделив текущую (активную) ссылку,
  при этом убрав его у всех остальных элементов меню.
  
  Пунктов меню может быть произвольное количество, используйте
  прием делегирование событий. Учтите клик по самому ul, его
  необходимо игнорировать.
  
  При клике по ссылкам не должна перезагружаться страница!
*/

const menu = document.querySelector('.js-menu');
const items = menu.children;

const makeItemActive = event => {
  event.preventDefault();
  event.stopPropagation();

  [...items].forEach(item => {
    const link = item.firstElementChild;
    link.classList.remove('active');
  });

  const target = event.target;

  target.classList.add('active');
};

menu.addEventListener('click', makeItemActive);
