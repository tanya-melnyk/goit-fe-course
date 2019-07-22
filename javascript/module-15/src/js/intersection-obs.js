'use strict';

// styles
import 'material-design-icons/iconfont/material-icons.css';

// helpers
import apiPhotoService from './services/photos-service';
import openModalBtnClickHandler from './services/modal-service';
// import InfiniteScroll from 'infinite-scroll';

// HTML template
import photoCardTemplate from '../templates/photo-card.hbs';

// DOM elements
const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  sentinel: document.getElementById('sentinel'),
};

// initializing Infinite Scroll plugin
// const infScrollInstance = new InfiniteScroll(refs.gallery, {
//   path: '{{#}}',
//   status: '.page-load-status',
//   scrollThreshold: 100,
// });

// adding event listeners
refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.gallery.addEventListener('click', openModalBtnClickHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  clearListItems();

  const form = e.currentTarget;
  const input = form.elements.query;

  apiPhotoService.resetPage();
  apiPhotoService.searchQuery = input.value;
  fetchPhotos();

  // input.value = '';
}

// load more photos when scrolled to the bottom
loadPhotosOnIntersectionWith(refs.sentinel);

function loadPhotosOnIntersectionWith(target) {
  const options = {
    rootMargin: '100px 0px',
    threshold: 0.01,
  };

  const sentinelObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchPhotos();
      }
    });
  }, options);

  sentinelObserver.observe(target);
}

function fetchPhotos() {
  apiPhotoService
    .fetchArticles()
    .then(photos => {
      renderPhotoCards(photos);
    })
    .catch(error => {
      console.warn(error);
    });
}

function renderPhotoCards(photos) {
  const markup = photoCardTemplate(photos);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

// infScrollInstance.on('scrollThreshold', fetchPhotos);
