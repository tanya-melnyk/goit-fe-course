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

// Apply the theme saved in Local Storage
const currentTheme = JSON.parse(localStorage.getItem('theme'));

if (currentTheme && currentTheme === 'dark') {
  ref.body.classList.add(`theme-dark`);
  ref.themeSwitchBtnIcon.textContent = 'wb_sunny';
} else {
  ref.body.classList.add(`theme-light`);
  ref.themeSwitchBtnIcon.textContent = 'brightness_3';
}

// Save or update data in Local Storage
const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

// Switch the theme and save it to Local Storage
const handleThemeSwitchBtnClick = e => {
  const icon = e.target;
  icon.textContent =
    icon.textContent === 'wb_sunny' ? 'brightness_3' : 'wb_sunny';

  const body = document.querySelector('body');
  body.classList.toggle('theme-light');
  body.classList.toggle('theme-dark');

  const currentTheme = JSON.parse(localStorage.getItem('theme'));

  saveToLocalStorage('theme', currentTheme === 'dark' ? 'ligth' : 'dark');
};

ref.themeSwitchBtn.addEventListener('click', handleThemeSwitchBtnClick);
