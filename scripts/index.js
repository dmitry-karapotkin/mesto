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

const popupForm = document.querySelector('.popup.popup_type_form');
const popupElement = document.querySelector('.popup.popup_type_element');

const profileInfo = document.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__job');

const addButton = document.querySelector('.profile__add-button');

const formElement = document.querySelector('.popup__form');
const firstInput = formElement.querySelector('.popup__input_type_first-row');
const secondInput = formElement.querySelector('.popup__input_type_second-row');
const formTitle = formElement.querySelector('.popup__title');
const closeFormButton = formElement.querySelector('.popup__close-button');
const submitButton = formElement.querySelector('.popup__save-button');

const closeElementButton = popupElement.querySelector('.popup__close-button');

function openPopupElement(evt) {
  let popupPhoto = popupElement.querySelector('.popup__image');
  let popupCaption = popupElement.querySelector('.popup__caption');
  let elementText = evt.target.parentNode.querySelector('.element__caption-text');

  popupElement.classList.add('popup_opened');
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = elementText.textContent.toLowerCase();
  popupCaption.textContent = elementText.textContent;
};

function toggleLikeButton (evt) {
  if (evt.target.src.includes('white')) {
    evt.target.src = 'images/mesto-heart-icon-black.svg'
  } else {
    evt.target.src = 'images/mesto-heart-icon-white.svg'
  }
};

function deleteElement (evt) {
  evt.target.parentNode.remove();
};

function createElement(textValue, srcValue) {
  let newElement = templateElement.cloneNode(true);
  let elementPhoto = newElement.querySelector('.element__photo');
  let elementText =  newElement.querySelector('.element__caption-text');
  let likeButton = newElement.querySelector('.element__like-button');
  let trashButton = newElement.querySelector('.element__trash-button');
  elementPhoto.addEventListener('click', openPopupElement);
  likeButton.addEventListener('click', toggleLikeButton);
  trashButton.addEventListener('click', deleteElement);

  elementPhoto.src = srcValue;
  elementPhoto.alt = textValue.toLowerCase();
  elementText.textContent = textValue;

  return newElement;
};

function editButtonClickHandler () {
  popupForm.classList.add('popup_opened');
  formTitle.textContent = 'Редактировать профиль';
  submitButton.textContent = 'Сохранить';
  firstInput.value = profileName.textContent;
  secondInput.value = profileJob.textContent;
};

function addButtonClickHandler () {
  popupForm.classList.add('popup_opened');
  formTitle.textContent = 'Новое место';
  submitButton.textContent = 'Создать';
  firstInput.value = '';
  firstInput.placeholder = 'Название';
  secondInput.value = '';
  secondInput.placeholder = 'Ссылка на картинку';
};

function updateProfile (nameValue, jobValue) {
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
};

function closePopup (evt) {
  evt.target.parentNode.parentNode.classList.remove('popup_opened');
}

function handleSubmitEvent(evt) {
  evt.preventDefault();
  if (formTitle.textContent === 'Редактировать профиль') {
    updateProfile(firstInput.value, secondInput.value)
  } else {
    sectionElements.prepend(createElement(firstInput.value, secondInput.value));
  }
  popupForm.classList.remove('popup_opened');
};

initialCards.forEach((item) => sectionElements.prepend(createElement(item.name, item.link)));

editButton.addEventListener('click', editButtonClickHandler);
addButton.addEventListener('click', addButtonClickHandler);
closeFormButton.addEventListener('click', closePopup);
closeElementButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleSubmitEvent);
