'use strict';

import './styles.css';
import menuData from './menu.json';
import menuTemplate from './templates/menu.hbs';

// HTML references
const ref = {
  body: document.querySelector('body'),
  menuList: document.querySelector('#menu'),
  themeSwitchBtn: document.querySelector('button[data-action="theme-switch"]'),
  themeSwitchBtnIcon: document.querySelector('i.toolbar__icon'),
};

///////////////////////////////////////////////////////////////

// Create menu HTML from template
const menuMarkup = menuTemplate(menuData);
ref.menuList.innerHTML = menuMarkup;

///////////////////////////////////////////////////////////////

// LOCAL STORAGE
// Get data from Local Storage
const loadFromLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Save or update data in Local Storage
const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

//////////////////////////////////////////////////////////////////

// Theme settings
const themeLight = {
  style: 'theme-light',
  icon: 'brightness_3',
};

const themeDark = {
  style: 'theme-dark',
  icon: 'wb_sunny',
};

// Apply the theme saved in Local Storage
const savedTheme = loadFromLocalStorage('theme');

if (savedTheme === themeDark.style) {
  ref.body.classList.replace(themeLight.style, themeDark.style);
  ref.themeSwitchBtnIcon.textContent = themeDark.icon;
}

// Switch the theme and save it to Local Storage
const handleThemeSwitchBtnClick = e => {
  const icon = e.target;
  const currentTheme = loadFromLocalStorage('theme');

  if (currentTheme === themeDark.style) {
    ref.body.classList.replace(themeDark.style, themeLight.style);
    icon.textContent = themeLight.icon;
    saveToLocalStorage('theme', themeLight.style);
  } else {
    ref.body.classList.replace(themeLight.style, themeDark.style);
    icon.textContent = themeDark.icon;
    saveToLocalStorage('theme', themeDark.style);
  }
};

ref.themeSwitchBtn.addEventListener('click', handleThemeSwitchBtnClick);
