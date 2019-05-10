'use strict';

/*
  1
  Есть список категорий с классом categories (на вкладке HTML).
  
  Напишите код, который для каждого элемента li (первая вложенность) 
  в списке categories выведет в консоль:
  - Текст непосредственно в нём (название категории)
  - Количество всех вложенных в него элементов li
  
  К примеру:
    Категория: Животные
    Количество вложенных li: 4
*/

const categoriesList = document.querySelector('.categories');

const categories = categoriesList.children;

[...categories].forEach(item => {
  const category = item.firstChild;
  const categoryItemsList = category.nextSibling;
  const categoryItems = categoryItemsList.children;
  console.log(`Категория: ${category.textContent}
    Количество вложенных li: ${categoryItems.length}`);
});

/*
  2
  Дан список с классом .skills-list
	- Найдите первого потомка списка и сделайте его текст красного цвета
	- Найдите последнего потомка списка и сделайте его текст синего цвета
*/

const skillsList = document.querySelector('.skills-list');

const firstSkill = skillsList.firstElementChild;
const lastSkill = skillsList.lastElementChild;

firstSkill.style.color = 'red';
lastSkill.style.color = 'blue';

/*
  3
  Дан ul склассом .list и массив строк. 
  
  Вставьте элементы этого массива в ul так, чтобы каждый элемент стоял в своем li.
*/

const elements = ['HTML', 'CSS', 'JavaScript', 'React', 'Node'];
const markup = elements.reduce((str, elem) => str + `<li>${elem}</li>`, '');

const list = document.querySelector('.list');
list.innerHTML = markup;

/*
  4
  Напишите скрипт для создания галлереи изображений. 
  
  - На вкладке HTML уже есть ul.gallery.
  - Используйте массив объектов для создания тегов img вложенных в li
  - Оформление по вкусу, можно и не делать, достаточно чтобы каждое 
    изображение было 300px по ширине
  - Добавьте все элементы галлереи в ul.gallery
*/

const galleryItems = [
  {
    url:
      'https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'White and Black Long Fur Cat',
  },
  {
    url:
      'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'Orange and White Koi Fish Near Yellow Koi Fish',
  },
  {
    url:
      'https://images.pexels.com/photos/1216482/pexels-photo-1216482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'Two Brown Hen and One Red Rooster',
  },
  {
    url:
      'https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'Group of Horses Running',
  },
  {
    url:
      'https://images.pexels.com/photos/1316294/pexels-photo-1316294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'Macaw Birds',
  },
  {
    url:
      'https://images.pexels.com/photos/41178/africa-animal-big-carnivore-41178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: '2 Lion on Grass Field during Daytime',
  },
];

const galleryMarkup = galleryItems.reduce(
  (str, elem) =>
    str + `<li><img src="${elem.url}" alt="${elem.alt}" width="300"></li>`,
  '',
);

const gallery = document.querySelector('.gallery');

gallery.innerHTML = galleryMarkup;

gallery.setAttribute(
  'style',
  'list-style:none; padding: 20px; background: teal; display: flex; flex-wrap: wrap;',
);

const galleryItemsList = gallery.children;

[...galleryItemsList].forEach(item =>
  item.setAttribute('style', 'padding: 20px; border: 1px solid white;'),
);

/*
  5
  Есть список с классом .size-filter из произвольного 
  количества чекбоксов, каждый из которых содержит 
  размер одежды в фильтре.
  
  Напишите функцию collectInputData(inputs), которая
  принимает 1 параметр inputs - массив тех инпутов
  у которых состояние checked.
  
  Возвращает массив значений атрибута value.
*/

const inputs = document.querySelectorAll('input');

const checkedInputs = [...inputs].filter(input =>
  input.hasAttribute('checked'),
);

const collectInputData = inputs =>
  inputs.map(input => input.getAttribute('value'));

console.log(collectInputData(checkedInputs));

/*
  6
  Создайте функцию createMovieCard(), которая 
  создает и возвращает DOM-узел карточки кинофильма.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/

function createMovieCards(movies) {
  const movieCards = document.createElement('div');

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');

    const img = document.createElement('img');
    img.classList.add('movie__image');
    img.src = movie.imgSrc;
    img.alt = 'movie image';

    movieCard.appendChild(img);

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__body');

    movieCard.appendChild(movieInfo);

    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie__title');
    movieTitle.textContent = movie.title;

    movieInfo.appendChild(movieTitle);

    const movieDescription = document.createElement('p');
    movieDescription.classList.add('movie__description');
    movieDescription.textContent = movie.description;

    movieInfo.appendChild(movieDescription);

    const movieDate = document.createElement('p');
    movieDate.classList.add('movie__date');
    movieDate.textContent = movie.date;

    movieInfo.appendChild(movieDate);

    const movieRating = document.createElement('p');
    movieRating.classList.add('movie__rating');
    movieRating.textContent = movie.rating;

    movieInfo.appendChild(movieRating);

    movieCards.appendChild(movieCard);
  });

  return movieCards;
}

// Или используя клонирование

// function createMovieCards(movies) {
//   const movieCards = document.createElement('div');
//   const movieCardHTML = document.querySelector('.movie');

//   movies.forEach(movie => {
//     const movieCard = movieCardHTML.cloneNode(true);

//     const [img, movieInfo] = [...movieCard.children];

//     img.src = movie.imgSrc;

//     const [title, description, date, rating] = [...movieInfo.children];

//     title.textContent = movie.title;
//     description.textContent = movie.description;
//     date.textContent = movie.date;
//     rating.textContent = movie.rating;

//     movieCards.appendChild(movieCard);
//   });

//   return movieCards;
// }

const movies = [
  {
    title: 'Betty Blue',
    imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41OBAkdAhWL.jpg',
    description:
      'A lackadaisical handyman and aspiring novelist tries to support his younger girlfriend as she slowly succumbs to madness.',
    date: 'Released: 1986-04-09',
    rating: 'Rating: 7.4',
  },
  {
    title: 'Great Expectations',
    imgSrc:
      'https://images-na.ssl-images-amazon.com/images/I/71VA7P7AVZL._SY445_.gif',
    description:
      'Modernization of Charles Dickens classic story finds the hapless Finn as a painter in New York City pursuing his unrequited and haughty childhood love.',
    date: 'Released: 1998-07-08',
    rating: 'Rating: 6.8',
  },
];

const moviesSection = document.querySelector('.movies');

moviesSection.appendChild(createMovieCards(movies));

/*
  7
  В HTML-документе уже есть тег с id="root" (вкладка HTML)
  
  Создайте функцию createBoxes(num), которая принимает 1 параметр num - число.
  
  Функция создает столько div, сколько указано в num и возвращает их в одном
  общем контейнере. После чего необходимо повесить результат работы функции
  в div с id="#root"
  
  Каждый div:
    - Имеет случайный rgb цвет фона
    - Размеры самого первого div - 30px на 30px.
    - Каждый следующий div после первого, должен быть шире и выше предыдущего
      на 10px
*/

function createBoxes(num) {
  const container = document.createElement('div');
  container.classList.add('container');
  container.setAttribute('style', 'display: flex; flex-wrap: wrap;');
  let boxSize = 30;
  const getRandomRgbColor = () => {
    const getRandomRgbNum = () => Math.floor(Math.random() * 256);
    return `rgb(${getRandomRgbNum()}, ${getRandomRgbNum()}, ${getRandomRgbNum()})`;
  };
  while (num > 0) {
    num -= 1;
    const box = document.createElement('div');
    box.style.backgroundColor = getRandomRgbColor();
    box.style.width = boxSize + 'px';
    box.style.height = boxSize + 'px';
    boxSize += 10;
    container.appendChild(box);
  }
  return container;
}
const root = document.querySelector('#root');
root.appendChild(createBoxes(12));
