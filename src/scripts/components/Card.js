export default class Card {
  constructor (
    { likes, _id, name, link, owner, createdAt },
    selector,
    handleCardClick,
    handleCardDelete,
    handleLikeClick
  ) {
    this._likes = likes.map(x => x['_id']);
    this.id = _id;
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
      this._handleLikeClick(this)
        .then(data => {
          this._likes = data.likes.map(x => x['_id']);
          this._refreshLikeNumber();
          this._toggleLikeButton();
        })
        .catch(err => console.log(err));

    });
    this._trashButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
  }

  _toggleLikeButton () {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _refreshLikeNumber () {
    this._likeNumber.textContent = this._likes.length;
  }

  _isOwner(userId) {
    return this._owner_id === userId;
  }

  generateCard (userId) {
    this.element = this._getTemplate();
    this._likes = this._likes;
    this._trashButton = this.element.querySelector('.element__trash-button');
    this._likeButton = this.element.querySelector('.element__like-button');
    this._cardImage = this.element.querySelector('.element__photo');
    this._likeNumber = this.element.querySelector('.element__like-number');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place.toLowerCase();
    this.element.querySelector('.element__caption-text').textContent = this._place;

    this._refreshLikeNumber();
    this._setEventListeners();

    if (!this._isOwner(userId)) {
      this._trashButton.remove();
      delete this._trashButton;
    };

    if (this._likes.includes(userId)) {
      this._likeButton.classList.add('element__like-button_active')
    };

    return this.element;
  }

}
