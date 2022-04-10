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

const settingDict = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  cancelClass: '.popup__close-button'
};

const sectionElements = document.querySelector('.elements');
const templateElement = document.querySelector('#element').content.querySelector('.element');
const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector('.popup_type_profile');
const closeProfileButton = popupProfile.querySelector('.popup__close-button');
const profileForm = popupProfile.querySelector('.popup__form');
const inputName = profileForm.querySelector('.popup__input_type_first-row');
const inputJob = profileForm.querySelector('.popup__input_type_second-row');

const popupPlace = document.querySelector('.popup_type_place');
const closePlaceButton = popupPlace.querySelector('.popup__close-button');
const placeForm = popupPlace.querySelector('.popup__form');
const inputPlace = placeForm.querySelector('.popup__input_type_first-row');
const inputLink = placeForm.querySelector('.popup__input_type_second-row');
const submitPlaceButton = placeForm.querySelector('.popup__save-button');

const popupElement = document.querySelector('.popup_type_element');
const closeElementButton = popupElement.querySelector('.popup__close-button');
const popupPhoto = popupElement.querySelector('.popup__image');
const popupCaption = popupElement.querySelector('.popup__caption');

const profileInfo = document.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__job');

const addButton = document.querySelector('.profile__add-button');

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
};

function openPopupPlace () {
    openPopup(popupPlace);
};

function openPopupElement (photo, text) {
  openPopup(popupElement);
  popupPhoto.src = photo;
  popupPhoto.alt = text.toLowerCase();
  popupCaption.textContent = text;
};

export { openPopupElement };

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEscapeKey);
};

function closePopupProfile () {
  closePopup(popupProfile);
};

function closePopupPlace () {
  closePopup(popupPlace);
  popupPlace.querySelector('.popup__form').reset();
};

function closePopupElement () {
  closePopup(popupElement)
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(inputPlace.value, inputLink.value);
  sectionElements.prepend(card.generateCard());
  inputPlace.value = '';
  inputLink.value = '';
  closePopup(popupPlace);
  submitPlaceButton.classList.add('popup__save-button_disabled');
  submitPlaceButton.disabled = true;
};

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  sectionElements.prepend(card.generateCard());
  }
);

popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', evt => evt.target.classList.contains('popup') ? closePopup(popupElement) : NaN);
});

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);
closeProfileButton.addEventListener('click', closePopupProfile);
closePlaceButton.addEventListener('click', closePopupPlace);
closeElementButton.addEventListener('click', closePopupElement);
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach(formElement => {
  const validator = new FormValidator(settingDict, formElement);
  validator.enableValidation();
});
