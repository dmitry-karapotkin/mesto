import { openPopupElement } from './index.js';

class Card {
  constructor (place, link) {
    this._place = place;
    this._link = link;
  }

  _getTemplate () {
    const templateElement = document
                            .querySelector('#element')
                            .content.querySelector('.element')
                            .cloneNode(true);

    return templateElement;
  }

  _setEventListeners () {
    this._element
    .querySelector('.element__photo')
    .addEventListener('click', () => openPopupElement(this._link, this._place));

    this._element
    .querySelector('.element__like-button')
    .addEventListener('click', () => this._toggleLikeButton());

    this._element
    .querySelector('.element__trash-button')
    .addEventListener('click', () => this._deleteElement());

  }

  _toggleLikeButton () {
    const likeButton = this._element.querySelector('.element__like-button');
    if (likeButton.src.includes('white')) {
      likeButton.src = 'images/mesto-heart-icon-black.svg'
  } else {
    likeButton.src = 'images/mesto-heart-icon-white.svg'
    }
  }

  _deleteElement () {
    this._element.remove();
  }

  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._place.toLowerCase();
    this._element.querySelector('.element__caption-text').textContent = this._place;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
