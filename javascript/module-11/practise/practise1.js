'use strict';

/*
 * К pen уже подключен Handlebars.
 * Используй встроенные шаблоны и метод Handlebars.compile
 *
 * Создай шаблон элемента списка указаного на вкладке HTML.
 * Отрендери список в DOM по данным из массива products.
 */

const listItemsContext = {
  products: [
    { name: 'Apples', quantity: 50 },
    { name: 'Grapes', quantity: 44 },
    { name: 'Cheese', quantity: 128 },
    { name: 'Milk', quantity: 93 },
  ],
};

const listItemsSource = document
  .querySelector('#list-item-template')
  .innerHTML.trim();

const listItemsTemplate = Handlebars.compile(listItemsSource);
const listItemsMarkup = listItemsTemplate(listItemsContext);
const productList = document.querySelector('.products');
productList.innerHTML = listItemsMarkup;
