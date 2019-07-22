'use strict';

import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import spinner from './spinner';

export default function openModalBtnClickHandler(e) {
  const targetElem = e.target;

  if (
    targetElem.textContent !== 'zoom_out_map' &&
    !targetElem.classList.contains('fullscreen-button')
  ) {
    return;
  }

  const photoCard = targetElem.closest('.photo-card');
  const img = photoCard.querySelector('img');
  const largeImgURL = img.dataset.source;

  openModal(largeImgURL);
}

function openModal(imgURL) {
  // creating modal window instance
  const modalInstance = basicLightbox.create(`<img src=${imgURL}>`, {
    onShow: instance => {
      spinner.show();
    },
    onClose: instance => {
      spinner.hide();
    },
  });

  modalInstance.show();

  // adding possibility to close modal window with 'Esc' button
  window.addEventListener('keydown', e => {
    if (e.key !== 'Escape') {
      return;
    }

    modalInstance.close();
  });
}
