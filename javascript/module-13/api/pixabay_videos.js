'use strict';

const container = document.querySelector('#task-2');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = document.querySelector('.result-2');
const API_base = 'https://pixabay.com/api/videos/';
const key = '?key=12880088-5f1634c62e30865f461701c2f';
const params = '&per_page=4';

form.addEventListener('submit', fetchVideos);

function fetchVideos(e) {
  e.preventDefault();

  const search = `&q=${input.value}`;

  fetch(API_base + key + search + params)
    .then(response => response.json())
    .then(videosData => {
      rendervideos(videosData.hits);
    });
}

function rendervideos(videos) {
  console.log(videos);
  const markup = videos.reduce((str, video) => {
    return (
      str +
      `<video controls width='640' height='360'>
         <source src=${video.videos.small.url} type = 'video/mp4' >
       </video>`
    );
  }, '');

  result.innerHTML = markup;
}
