'use strict';

// styles
import 'material-design-icons/iconfont/material-icons.css';

// HTML template
import photoCardTemplate from '../templates/photo-card.hbs';

// helpers
import InfiniteScroll from 'infinite-scroll';
import openModalBtnClickHandler from './services/modal-service';

// DOM elements
const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

// adding event listeners
refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.gallery.addEventListener('click', openModalBtnClickHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  clearListItems();

  const form = e.currentTarget;
  const input = form.elements.query;

  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
  const baseURL = 'https://pixabay.com/api/';
  const params = '?image_type=photo&orientation=horizontal&per_page=12';
  const key = '&key=12880088-5f1634c62e30865f461701c2f';

  const infScrollInstance = new InfiniteScroll(refs.gallery, {
    responseType: 'text',
    history: false,
    path() {
      return (
        corsAnywhere +
        baseURL +
        params +
        key +
        `&q=${input.value}` +
        `&page=${this.pageIndex}`
      );
    },
  });

  infScrollInstance.pageIndex = 1;

  infScrollInstance.on('load', response => {
    const photosData = JSON.parse(response);
    const photos = photosData.hits;
    const markup = photoCardTemplate(photos);

    const proxyEl = document.createElement('div');
    proxyEl.innerHTML = markup;

    const parsedItems = proxyEl.querySelectorAll('.gallery-item');
    infScrollInstance.appendItems(parsedItems);
  });

  infScrollInstance.loadNextPage();
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
