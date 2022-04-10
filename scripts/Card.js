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
    this._cardImage.addEventListener('click', () => openPopupElement(this._link, this._place));

    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeButton.addEventListener('click', () => this._toggleLikeButton());

    this._element
    .querySelector('.element__trash-button')
    .addEventListener('click', () => this._deleteElement());

  }

  _toggleLikeButton () {
    if (this._likeButton.src.includes('white')) {
      this._likeButton.src = 'images/mesto-heart-icon-black.svg'
  } else {
    this._likeButton.src = 'images/mesto-heart-icon-white.svg'
    }
  }

  _deleteElement () {
    this._element.remove();
  }

  generateCard () {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place.toLowerCase();
    this._element.querySelector('.element__caption-text').textContent = this._place;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
