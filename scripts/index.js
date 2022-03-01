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

const sectionElements = document.querySelector('.elements');
const templateElement = document.querySelector('#element').content.querySelector('.element');

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

const popupElement = document.querySelector('.popup_type_element');
const closeElementButton = popupElement.querySelector('.popup__close-button');
const popupPhoto = popupElement.querySelector('.popup__image');
const popupCaption = popupElement.querySelector('.popup__caption');

const profileInfo = document.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__job');

const addButton = document.querySelector('.profile__add-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
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
  popupPhoto.src = photo.src;
  popupPhoto.alt = text.textContent.toLowerCase();
  popupCaption.textContent = text.textContent;
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function closePopupProfile () {
  closePopup(popupProfile);
};
function closePopupPlace () {
  closePopup(popupPlace);
};

function closePopupElement () {
  closePopup(popupElement)
};

function toggleLikeButton (evt) {
  if (evt.target.src.includes('white')) {
    evt.target.src = 'images/mesto-heart-icon-black.svg'
  } else {
    evt.target.src = 'images/mesto-heart-icon-white.svg'
  }
};

function deleteElement (evt) {
  evt.target.closest('.element').remove();
};

function createElement(textValue, srcValue) {
  const newElement = templateElement.cloneNode(true);
  const elementPhoto = newElement.querySelector('.element__photo');
  const elementText =  newElement.querySelector('.element__caption-text');
  const likeButton = newElement.querySelector('.element__like-button');
  const trashButton = newElement.querySelector('.element__trash-button');
  elementPhoto.addEventListener('click', () => openPopupElement(elementPhoto, elementText));
  likeButton.addEventListener('click', toggleLikeButton);
  trashButton.addEventListener('click', deleteElement);

  elementPhoto.src = srcValue;
  elementPhoto.alt = textValue.toLowerCase();
  elementText.textContent = textValue;

  return newElement;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  sectionElements.prepend(createElement(inputPlace.value, inputLink.value));
  inputPlace.value = '';
  inputLink.value = '';
  closePopup(popupPlace);
};

initialCards.forEach((item) => sectionElements.prepend(createElement(item.name, item.link)));

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);
closeProfileButton.addEventListener('click', closePopupProfile);
closePlaceButton.addEventListener('click', closePopupPlace);
closeElementButton.addEventListener('click', closePopupElement);
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);
