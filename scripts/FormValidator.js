class FormValidator {
  constructor (settingDict, formElement) {
    this._inputSelector = settingDict.inputSelector;
    this._submitButtonSelector = settingDict.submitButtonSelector;
    this._inactiveButtonClass = settingDict.inactiveButtonClass;
    this._inputErrorClass = settingDict.inputErrorClass;
    this._errorClass = settingDict.errorClass;
    this._cancelClass = settingDict.cancelClass;

    this._formElement = formElement;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState ()  {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };


  _setValidationRules () {

    this._inputList.forEach(inputElement => {


    inputElement.addEventListener('input', () => {

      this._isValid(inputElement);
      this._toggleButtonState();

    });

    })
  };


  _setEventListeners () {
    const cancelElement = this._formElement.querySelector(this._cancelClass);


    cancelElement.addEventListener('click', () => {

      this._inputList.forEach(inputElement => this._hideInputError(inputElement));
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;

    });
  }

  enableValidation () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._setValidationRules();
    this._setEventListeners();
  };

}

export { FormValidator };
