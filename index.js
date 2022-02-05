let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');
let closeButton = formElement.querySelector('.popup__close-button');

let profileInfo = document.querySelector('.profile-info');
let profileName = profileInfo.querySelector('.profile-info__name');
let profileJob = profileInfo.querySelector('.profile-info__job');
let editButton = profileInfo.querySelector('.profile-info__edit-button');

function editButtonClickHandler () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function closeFormCommand () {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeFormCommand();
};

editButton.addEventListener('click', editButtonClickHandler);
closeButton.addEventListener('click', closeFormCommand);
formElement.addEventListener('submit', formSubmitHandler);
