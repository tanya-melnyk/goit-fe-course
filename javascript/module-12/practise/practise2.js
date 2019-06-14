'use strict';

/*
 * Есть массив цветов в hex-формате и кнопки Start и Stop.
 *
 * Напиши скрипт, который после нажатия кнопки Start, раз в секунду
 * меняет цвет фона body на случайное значение из массива. Используй
 * инлайн-стиль для изменения background-color.
 *
 * При нажатии на кнопку Stop, изменении цвета фона должно останавливаться.
 *
 * Учти, что на кнопку Start можно нажать бесконечное количество раз.
 * Сделай так, чтобы пока изменение темы запушено, кнопка Start была не активна.
 */

const ref = {
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
};

const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const randomIdx = () => Math.floor(Math.random() * 6);

const changeColor = elem => {
  elem.style.backgroundColor = colors[randomIdx()];
};

const startChanges = e => {
  const btn = e.target;
  btn.disabled = true;

  const text = btn.previousElementSibling;

  const timerId = setInterval(changeColor, 1000, text);

  const stopChanges = e => {
    clearInterval(timerId);
    btn.disabled = false;
  };

  ref.stopBtn.addEventListener('click', stopChanges);
};

ref.startBtn.addEventListener('click', startChanges);
