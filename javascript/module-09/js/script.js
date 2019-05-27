'use strict';

import galleryItems from './gallery-items.js';

const createGalleryImage = (preview, original, description) => {
  const galleryImage = document.createElement('img');

  galleryImage.classList.add('gallery__image');
  galleryImage.src = preview;
  galleryImage.dataset.source = original;
  galleryImage.alt = description;

  return galleryImage;
};

const createGalleryIcon = () => {
  const galleryIcon = document.createElement('span');
  galleryIcon.classList.add('gallery__icon');

  const materialIcon = document.createElement('i');
  materialIcon.classList.add('material-icons');
  materialIcon.textContent = 'zoom_out_map';

  galleryIcon.appendChild(materialIcon);

  return galleryIcon;
};

const createGalleryItem = ({ preview, original, description }) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = original;

  const galleryImage = createGalleryImage(preview, original, description);
  const galleryIcon = createGalleryIcon();

  galleryLink.append(galleryImage, galleryIcon);
  galleryItem.append(galleryLink);

  return galleryItem;
};

const htmlGalleryItems = galleryItems.map(item => createGalleryItem(item));

const gallery = document.querySelector('.gallery');
gallery.append(...htmlGalleryItems);

// EVENTS

function openModal(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) {
    return;
  }

  const gallery = e.currentTarget;
  const galleryImg = e.target;

  const modal = gallery.nextElementSibling;
  modal.classList.add('is-visible');

  const modalImg = modal.querySelector('img');
  modalImg.src = galleryImg.dataset.source;

  window.addEventListener('keydown', handleKeyPress);
}

const modal = document.querySelector('.overlay');
const closeModalBtn = modal.querySelector('button[data-action="close-modal"]');

function handleKeyPress(e) {
  if (e.key !== 'Escape') {
    return;
  }

  closeModal();
}

function handleModalClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  closeModal();
}

function closeModal() {
  modal.classList.remove('is-visible');
  window.removeEventListener('keydown', handleKeyPress);
}

gallery.addEventListener('click', openModal);
modal.addEventListener('click', handleModalClick);
closeModalBtn.addEventListener('click', closeModal);
