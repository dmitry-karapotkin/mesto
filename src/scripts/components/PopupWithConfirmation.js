import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, confirmDeletion}) {
    super(popupSelector);
    this._confirmDeletion = confirmDeletion;
    this._deleteButton = this._element.querySelector('.popup__save-button');
  }

  open(card) {
    super.open();
    this._card = card;
  }

  deleteCard() {
    this._card.element.remove();
    this._card.element = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this._confirmDeletion(this._card)
    });
  }

}
