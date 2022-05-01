import Popup from './Popup.js';
import { formValidators } from '../utils/utils.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitter}) {
    super(popupSelector);
    this._submitForm = submitter;
    this._form = this._element.querySelector('.popup__form');
    this._firstInput = this._element.querySelector('.popup__input_type_first-row');
    this._secondInput = this._element.querySelector('.popup__input_type_second-row');
  }

  _getInputValues() {
    return {firstInput: this._firstInput.value, secondInput: this._secondInput.value };
  }

  close() {
    super.close();
    formValidators[this._form.getAttribute('name')].resetValidation();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

}
