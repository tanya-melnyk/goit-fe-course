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
  sum.textContent = x + y;
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

class Counter {
  constructor(onChange) {
    this.onChange = onChange;
    this.value = 0;
  }

  increment() {
    this.value = Number(this.value) + 1;
    counterValue.textContent = this.value;
  }

  decrement() {
    this.value = Number(this.value) - 1;
    counterValue.textContent = this.value;
  }
}

function onChange() {}

const counter_3 = new Counter(onChange);

const subBtn = document.querySelector('button[data-action="sub"]');
const addBtn = document.querySelector('button[data-action="add"]');

subBtn.addEventListener('click', counter_3.decrement.bind(counter_3));
addBtn.addEventListener('click', counter_3.increment.bind(counter_3));
