import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitter}) {
    super(popupSelector);
    this._submitForm = submitter;
    this._form = this._element.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
    });
  }
}
