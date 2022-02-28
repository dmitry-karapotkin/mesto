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
const popupPlace = document.querySelector('.popup_type_place');
const closePlaceButton = popupPlace.querySelector('.popup__close-button');
const placeForm = popupPlace.querySelector('.popup__form');
const popupElement = document.querySelector('.popup_type_element');
const closeElementButton = popupElement.querySelector('.popup__close-button');

const profileInfo = document.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__job');

const addButton = document.querySelector('.profile__add-button');

function addOpenedClass(popup) {
  popup.classList.add('popup_opened');
};

function openPopup (evt) {
  if (evt.path.includes(editButton)) {
    addOpenedClass(popupProfile);
    const inputName = profileForm.querySelector('.popup__input_type_first-row');
    const inputJob = profileForm.querySelector('.popup__input_type_second-row');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
  } else if (evt.path.includes(addButton)) {
    addOpenedClass(popupPlace);
    const inputPlace = placeForm.querySelector('.popup__input_type_first-row');
    const inputLink = placeForm.querySelector('.popup__input_type_second-row');
    inputPlace.value = '';
    inputLink.value = '';
  } else {
    addOpenedClass(popupElement);
    const popupPhoto = popupElement.querySelector('.popup__image');
    const popupCaption = popupElement.querySelector('.popup__caption');
    const elementText = evt.path[1].querySelector('.element__caption-text');

    popupPhoto.src = evt.target.src;
    popupPhoto.alt = elementText.textContent.toLowerCase();
    popupCaption.textContent = elementText.textContent;
  }
}

function removeOpenedClass(popup) {
  popup.classList.remove('popup_opened');
};

function closePopup (evt) {
  if (evt.target === closeProfileButton) {
    removeOpenedClass(popupProfile);
  } else if (evt.target === closePlaceButton) {
    removeOpenedClass(popupPlace);
  } else {
    removeOpenedClass(popupElement)
  }
};

function toggleLikeButton (evt) {
  if (evt.target.src.includes('white')) {
    evt.target.src = 'images/mesto-heart-icon-black.svg'
  } else {
    evt.target.src = 'images/mesto-heart-icon-white.svg'
  }
};

function deleteElement (evt) {
  evt.path[1].remove();
};

function createElement(textValue, srcValue) {
  const newElement = templateElement.cloneNode(true);
  const elementPhoto = newElement.querySelector('.element__photo');
  const elementText =  newElement.querySelector('.element__caption-text');
  const likeButton = newElement.querySelector('.element__like-button');
  const trashButton = newElement.querySelector('.element__trash-button');
  elementPhoto.addEventListener('click', openPopup);
  likeButton.addEventListener('click', toggleLikeButton);
  trashButton.addEventListener('click', deleteElement);

  elementPhoto.src = srcValue;
  elementPhoto.alt = textValue.toLowerCase();
  elementText.textContent = textValue;

  return newElement;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const inputName = evt.target.querySelector('.popup__input_type_first-row');
  const inputJob = evt.target.querySelector('.popup__input_type_second-row');
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  removeOpenedClass(popupProfile);
};

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const inputPlace = evt.target.querySelector('.popup__input_type_first-row');
  const inputLink = evt.target.querySelector('.popup__input_type_second-row');
  sectionElements.prepend(createElement(inputPlace.value, inputLink.value));
  removeOpenedClass(popupPlace);
};

initialCards.forEach((item) => sectionElements.prepend(createElement(item.name, item.link)));

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
closeProfileButton.addEventListener('click', closePopup);
closePlaceButton.addEventListener('click', closePopup);
closeElementButton.addEventListener('click', closePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);
