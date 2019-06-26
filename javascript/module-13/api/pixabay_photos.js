'use strict';

const container = document.querySelector('#task-1');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = document.querySelector('.result-1');
const API_base = 'https://pixabay.com/api/';
const key = '?key=12880088-5f1634c62e30865f461701c2f';
const params = '&image_type=photo&orientation=horizontal&per_page=6';

form.addEventListener('submit', fetchPhotos);

function fetchPhotos(e) {
  e.preventDefault();

  const search = `&q=${input.value}`;

  fetch(API_base + key + search + params)
    .then(response => response.json())
    .then(photosData => {
      renderPhotos(photosData.hits);
    });
}

function renderPhotos(photos) {
  console.log(photos);
  const markup = photos.reduce((str, photo) => {
    return (
      str +
      `<img src=${photo.webformatURL} alt="User ${
        photo.tags
      } Avatar" width="500">`
    );
  }, '');

  result.innerHTML = markup;
}
