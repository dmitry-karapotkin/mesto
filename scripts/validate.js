const showInputError = (formElement, inputElement, errorMessage, dict) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(dict.inputErrorClass);
  errorElement.classList.add(dict.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, dict) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(dict.inputErrorClass);
  errorElement.classList.remove(dict.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, dict) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, dict);
  } else {
    hideInputError(formElement, inputElement, dict);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, dict) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(dict.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(dict.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function enableValidation (dict) {

  const formList = Array.from(document.querySelectorAll(dict.formSelector));

  formList.forEach((formElement) => {

    const inputList = Array.from(formElement.querySelectorAll(dict.inputSelector));
    const buttonElement = formElement.querySelector(dict.submitButtonSelector);
    const cancelElement = formElement.querySelector(dict.cancelClass);

    inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {

        isValid(formElement, inputElement, dict);
        toggleButtonState(inputList, buttonElement, dict);

      });

    });

    cancelElement.addEventListener('click', () => {

      inputList.forEach(inputElement => hideInputError(formElement, inputElement, dict));
      buttonElement.classList.remove(dict.inactiveButtonClass);
      buttonElement.disabled = false;

    });
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  cancelClass: '.popup__close-button'
});
