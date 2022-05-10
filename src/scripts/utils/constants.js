export const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const elementsSelector = '.elements';
export const templateSelector = '#element';
export const profile = {
  nameSelector: '.profile-info__name',
  jobSelector: '.profile-info__job',
  avatarSelector: '.profile-info__photo'
}

export const addButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile-info__edit-button');
export const editAvatarButton = document.querySelector('.profile-info__overlay');

const host = 'https://mesto.nomoreparties.co/v1/cohort-40';
const myToken = '4c149f7f-14ac-4bbb-bba6-c93092168f3d';

export const options = {
  baseUrl: host,
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
}
