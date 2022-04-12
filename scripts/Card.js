class Card {
  constructor (place, link, selector, openPopup) {
    this._place = place;
    this._link = link;
    this._selector = selector;
    this._openPopup = openPopup;
  }

  _getTemplate () {
    const templateElement = document
                            .querySelector(this._selector)
                            .content.querySelector('.element')
                            .cloneNode(true);

    return templateElement;
  }

  _setEventListeners () {
    this._cardImage.addEventListener('click', () => this._openPopup(this._link, this._place));
    this._likeButton.addEventListener('click', () => this._toggleLikeButton());
    this._element
    .querySelector('.element__trash-button')
    .addEventListener('click', () => this._deleteElement());

  }

  _toggleLikeButton () {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteElement () {
    this._element.remove();
  }

  generateCard () {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place.toLowerCase();
    this._element.querySelector('.element__caption-text').textContent = this._place;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };