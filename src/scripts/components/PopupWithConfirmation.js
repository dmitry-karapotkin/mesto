import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, confirmDeletion}) {
    super(popupSelector);
    this._confirmDeletion = confirmDeletion;
    this._deleteButton = this._element.querySelector('.popup__save-button');
  }

  open(evt) {
    super.open();
    this._card = evt.target.closest('.element');
    this._cardId = this._card._id;
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._card.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', this._confirmDeletion);
  }

}
