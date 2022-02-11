const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const closeButton = formElement.querySelector('.popup__close-button');

const profileInfo = document.querySelector('.profile-info');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__job');
const editButton = profileInfo.querySelector('.profile-info__edit-button');

function editButtonClickHandler () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function closeProfilePopup () {
    popup.classList.remove('popup_opened');
};

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeProfilePopup();
};

editButton.addEventListener('click', editButtonClickHandler);
closeButton.addEventListener('click', closeProfilePopup);
formElement.addEventListener('submit', handleProfileFormSubmit);
