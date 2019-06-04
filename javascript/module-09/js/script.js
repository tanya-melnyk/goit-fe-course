'use strict';

import galleryItems from './gallery-items.js';

class Gallery {
  constructor(galleryItems, elemClassName) {
    this._galleryItems = galleryItems;
    this._elemClassName = elemClassName;
    this._createGallery();
  }

  _createGalleryImage(preview, original, description) {
    const galleryImage = document.createElement('img');
    galleryImage.classList.add(`${this._elemClassName}__image`);
    galleryImage.src = '';
    galleryImage.dataset.lazy = preview;
    galleryImage.dataset.source = original;
    galleryImage.alt = description;
    return galleryImage;
  }

  _createGalleryIcon() {
    const galleryIcon = document.createElement('span');
    galleryIcon.classList.add(`${this._elemClassName}__icon`);

    const materialIcon = document.createElement('i');
    materialIcon.classList.add('material-icons');
    materialIcon.textContent = 'zoom_out_map';

    galleryIcon.appendChild(materialIcon);
    return galleryIcon;
  }

  _createGalleryItem({ preview, original, description }) {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add(`${this._elemClassName}__item`);

    const galleryLink = document.createElement('a');
    galleryLink.classList.add(`${this._elemClassName}__link`);
    galleryLink.href = original;

    const galleryImage = this._createGalleryImage(
      preview,
      original,
      description,
    );
    const galleryIcon = this._createGalleryIcon();

    galleryLink.append(galleryImage, galleryIcon);
    galleryItem.append(galleryLink);

    return galleryItem;
  }

  // images lazy-load
  _lazyLoad(target) {
    const options = {
      rootMargin: '50px 0px',
      threshold: 0.01,
    };
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const imgUrl = img.dataset.lazy;

          img.setAttribute('src', imgUrl);

          observer.disconnect();
        }
      });
    }, options);
    
    imgObserver.observe(target);
  }

  // EVENTS (close-open modal window)

  _openModal(e) {
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

    window.addEventListener('keydown', this._handleKeyPress.bind(this));
  }

  _handleKeyPress(e) {
    if (e.key !== 'Escape') {
      return;
    }

    this._closeModal();
  }

  _handleModalClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this._closeModal();
  }

  _closeModal() {
    const modal = document.querySelector('.overlay');
    modal.classList.remove('is-visible');

    const modalImg = modal.querySelector('img');
    modalImg.src = '';

    window.removeEventListener('keydown', this._handleKeyPress.bind(this));
  }

  _createGallery() {
    const htmlGalleryItems = this._galleryItems.map(item =>
      this._createGalleryItem(item),
    );

    const gallery = document.querySelector(`.${this._elemClassName}`);
    gallery.append(...htmlGalleryItems);

    // images lazy-load
    const galleryImages = gallery.querySelectorAll(
      `.${this._elemClassName}__image`,
    );
    galleryImages.forEach(img => this._lazyLoad(img));

    // EVENTS (close-open modal window)

    const modal = document.querySelector('.overlay');
    const closeModalBtn = modal.querySelector(
      'button[data-action="close-modal"]',
    );

    gallery.addEventListener('click', this._openModal.bind(this));
    closeModalBtn.addEventListener('click', this._closeModal.bind(this));
    modal.addEventListener('click', this._handleModalClick.bind(this));
  }
}

const gallery = new Gallery(galleryItems, 'gallery');

// import galleryItems from './gallery-items.js';

// const createGalleryImage = (preview, original, description) => {
//   const galleryImage = document.createElement('img');

//   galleryImage.classList.add('gallery__image');
//   galleryImage.src = '';
//   galleryImage.dataset.lazy = preview;
//   galleryImage.dataset.source = original;
//   galleryImage.alt = description;

//   return galleryImage;
// };

// const createGalleryIcon = () => {
//   const galleryIcon = document.createElement('span');
//   galleryIcon.classList.add('gallery__icon');

//   const materialIcon = document.createElement('i');
//   materialIcon.classList.add('material-icons');
//   materialIcon.textContent = 'zoom_out_map';

//   galleryIcon.appendChild(materialIcon);

//   return galleryIcon;
// };

// const createGalleryItem = ({ preview, original, description }) => {
//   const galleryItem = document.createElement('li');
//   galleryItem.classList.add('gallery__item');

//   const galleryLink = document.createElement('a');
//   galleryLink.classList.add('gallery__link');
//   galleryLink.href = original;

//   const galleryImage = createGalleryImage(preview, original, description);
//   const galleryIcon = createGalleryIcon();

//   galleryLink.append(galleryImage, galleryIcon);
//   galleryItem.append(galleryLink);

//   return galleryItem;
// };

// const htmlGalleryItems = galleryItems.map(item => createGalleryItem(item));

// const gallery = document.querySelector('.gallery');
// gallery.append(...htmlGalleryItems);

// // images lazy-load
// const lazyLoad = target => {
//   const options = {
//     rootMargin: '50px 0px',
//     threshold: 0.01,
//   };

//   const imgObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const img = entry.target;
//         const imgUrl = img.dataset.lazy;

//         img.setAttribute('src', imgUrl);

//         observer.disconnect();
//       }
//     });
//   }, options);

//   imgObserver.observe(target);
// };

// const galleryImages = gallery.querySelectorAll('.gallery__image');

// galleryImages.forEach(img => {
//   lazyLoad(img);
// });

// // EVENTS (close-open modal window)

// const modal = document.querySelector('.overlay');
// const closeModalBtn = modal.querySelector('button[data-action="close-modal"]');

// gallery.addEventListener('click', openModal);
// closeModalBtn.addEventListener('click', closeModal);
// modal.addEventListener('click', handleModalClick);

// function openModal(e) {
//   e.preventDefault();

//   if (e.target === e.currentTarget) {
//     return;
//   }

//   const gallery = e.currentTarget;
//   const galleryImg = e.target;

//   const modal = gallery.nextElementSibling;
//   const modalImg = modal.querySelector('img');
//   modalImg.src = galleryImg.dataset.source;

//   modal.classList.add('is-visible');

//   window.addEventListener('keydown', handleKeyPress);
// }

// function handleKeyPress(e) {
//   if (e.key !== 'Escape') {
//     return;
//   }

//   closeModal();
// }

// function handleModalClick(e) {
//   if (e.target !== e.currentTarget) {
//     return;
//   }

//   closeModal();
// }

// function closeModal() {
//   modal.classList.remove('is-visible');

//   const modalImg = modal.querySelector('img');
//   modalImg.src = '';

//   window.removeEventListener('keydown', handleKeyPress);
// }
