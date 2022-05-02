import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._element.querySelector('.popup__image');
    this._popupCaption = this._element.querySelector('.popup__caption');
  }

  open(src, text) {
    this._popupPhoto.src = src;
    this._popupPhoto.alt = text.toLowerCase();
    this._popupCaption.textContent = text;
    super.open();
  }

}
