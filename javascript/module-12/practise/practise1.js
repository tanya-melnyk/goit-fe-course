'use strict';

/*
 * Ознакомься с содержанием панелей HTML и CSS.
 *
 * Напиши скрипт который сохраняет выбранную пользователем
 * тему в localStorage и, при следующих посещениях страницы,
 * устанавливает ее автоматически. По умолчанию пусть будет светлая тема.
 *
 * При выборе темы, добавляй на элемент body соответствующий класс.
 */

const ref = {
  body: document.querySelector('body'),
  lightThemeBtn: document.querySelector('button[data-theme="light"]'),
  darkThemeBtn: document.querySelector('button[data-theme="dark"]'),
};

const theme = JSON.parse(localStorage.getItem('theme'));

if (theme && theme === 'dark') {
  ref.body.classList.add('theme-dark');
} else {
  ref.body.classList.add('theme-light');
}

const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

const setTheme = e => {
  const btn = e.target;
  if (btn.dataset.theme === 'light') {
    ref.body.classList.replace('theme-dark', 'theme-light');
    saveToLocalStorage('theme', 'light');
  } else {
    ref.body.classList.replace('theme-light', 'theme-dark');
    saveToLocalStorage('theme', 'dark');
  }
};

ref.lightThemeBtn.addEventListener('click', setTheme);
ref.darkThemeBtn.addEventListener('click', setTheme);
