'use strict';

/*
 * К pen уже подключен Handlebars.
 * Используй встроенные шаблоны и метод Handlebars.compile
 *
 * Создай шаблон поста указаного на вкладке HTML.
 * Отрендери список постов в DOM по данным из массива posts.
 *
 * Если в объекте поле favourite=true, в посте должна быть
 * разметка иконки избранного поста, в противном случае,
 * разметки иконки быть не должно.
 */

const articlesContext = {
  posts: [
    {
      title: 'Phasellus volutpat metus',
      text:
        'Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Ut leo.',
      favourite: true,
    },
    {
      title: 'Nulla consequat massa',
      text:
        'Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
      favourite: false,
    },
    {
      title: 'In enim justo',
      text:
        'Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Suspendisse eu ligula. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.',
      favourite: true,
    },
    {
      title: 'Vestibulum ante ipsum',
      text:
        'Vestibulum suscipit nulla quis orci. Praesent venenatis metus at tortor pulvinar varius. Nulla sit amet est. Suspendisse eu ligula sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien.',
      favourite: false,
    },
  ],
};

const articlesSource = document
  .querySelector('#articles-template')
  .innerHTML.trim();

const articlesTemplate = Handlebars.compile(articlesSource);
const articlesMarkup = articlesTemplate(articlesContext);
const articlesContainer = document.querySelector('.posts');
articlesContainer.innerHTML = articlesMarkup;
