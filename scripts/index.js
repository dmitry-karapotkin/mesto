import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const sectionElements = document.querySelector('.elements');
const templateSelector = '#element';
const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector('.popup_type_profile');
const profileForm = popupProfile.querySelector('.popup__form');
const inputName = profileForm.querySelector('.popup__input_type_first-row');
const inputJob = profileForm.querySelector('.popup__input_type_second-row');

const popupPlace = document.querySelector('.popup_type_place');
const placeForm = popupPlace.querySelector('.popup__form');
const inputPlace = placeForm.querySelector('.popup__input_type_first-row');
const inputLink = placeForm.querySelector('.popup__input_type_second-row');

const popupImage = document.querySelector('.popup_type_element');
const popupPhoto = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const profileInfo = document.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__job');

const addButton = document.querySelector('.profile__add-button');

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function handlePressEscapeKey (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEscapeKey);
};

function openPopupProfile () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  formValidators[profileForm.getAttribute('name')].resetValidation();
};

function openPopupPlace () {
    openPopup(popupPlace);
    formValidators[placeForm.getAttribute('name')].resetValidation();
};

function openPopupImage (photo, text) {
  openPopup(popupImage);
  popupPhoto.src = photo;
  popupPhoto.alt = text.toLowerCase();
  popupCaption.textContent = text;
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEscapeKey);

};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
  formValidators['edit-profile-info'].resetValidation();
};

function createCard (place, link) {
  const cardElement = new Card(place, link, templateSelector, openPopupImage);
  return cardElement;
};

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard(inputPlace.value, inputLink.value);
  sectionElements.prepend(card.generateCard());
  placeForm.reset();
  closePopup(popupPlace);
  formValidators['new-place'].resetValidation();
};

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  sectionElements.prepend(card.generateCard());
  }
);

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

enableValidation(setting);
