import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitter}) {
    super(popupSelector);
    this._submitForm = submitter;
    this._form = this._element.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector('.popup__save-button');
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
    this._isSaving(false);
  }

  _isSaving(flag) {
    if (flag) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._isSaving(true);
      this._submitForm(this._getInputValues());
    });
  }
}
