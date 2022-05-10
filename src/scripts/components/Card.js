export default class Card {
  constructor (
    { likes, _id, name, link, owner, createdAt },
    selector,
    handleCardClick,
    handleCardDelete,
    handleLikeClick
  ) {
    this._likes = likes.map(x => x['_id']);
    this._id = _id;
    this._place = name;
    this._link = link;
    this._owner_id = owner._id;
    this._createdAt = createdAt;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate () {
    const templateElement = document
                            .querySelector(this._selector)
                            .content.querySelector('.element')
                            .cloneNode(true);

    return templateElement;
  }

  _setEventListeners () {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._place));
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt, this._id)
        .then(data => {
          this._element._likes = data.likes.map(x => x['_id']);
          this._refreshLikeNumber();
        })
        .catch((err) => console.log(`Ошибка: ${err}`));

      this._toggleLikeButton();
    });
    this._trashButton.addEventListener('click', this._handleCardDelete);
  }

  _toggleLikeButton () {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _refreshLikeNumber () {
    this._likeNumber.textContent = this._element._likes.length;
  }

  _isOwner(userId) {
    return this._owner_id === userId;
  }

  generateCard (userId) {
    this._element = this._getTemplate();
    this._element._likes = this._likes;
    this._trashButton = this._element.querySelector('.element__trash-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._cardImage = this._element.querySelector('.element__photo');
    this._likeNumber = this._element.querySelector('.element__like-number');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place.toLowerCase();
    this._element.querySelector('.element__caption-text').textContent = this._place;

    this._refreshLikeNumber();
    this._setEventListeners();

    if (!this._isOwner(userId)) {
      this._trashButton.remove();
      delete this._trashButton;
    } else {
      this._element._id = this._id;
    };

    if (this._element._likes.includes(userId)) {
      this._likeButton.classList.add('element__like-button_active')
    };

    return this._element;
  }

}
