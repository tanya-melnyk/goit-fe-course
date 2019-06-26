'use strict';

const container = document.querySelector('#task-3');
const input = container.querySelector('input');
const form = container.querySelector('.search-form');
const result = document.querySelector('.result-3');
const API_base = 'https://newsapi.org/v2/everything?';
const params = '&from=2019-06-26&sortBy=popularity&pageSize=6';

form.addEventListener('submit', fetchNews);

function fetchNews(e) {
  e.preventDefault();

  const search = `q=${input.value}`;

  fetch(API_base + search + params, {
    headers: {
      Authorization: 'e99e42d78ecb49369891c272cad44aba',
    },
  })
    .then(response => response.json())
    .then(newsData => {
      renderNews(newsData.articles);
    });
}

function renderNews(articles) {
  console.log(articles);
  const markup = articles.reduce((str, article) => {
    return (
      str +
      `<div style="margin-left: 20px; flex: 0 0 auto">
         <h3 style="max-width: 500px"><a href=${article.url} target="_blank">${
        article.title
      }</a></h3>
         <img src=${
           article.urlToImage
         } alt="News" height="260" style="margin-bottom: 50px">
      </div>`
    );
  }, '');

  result.innerHTML = markup;
}
