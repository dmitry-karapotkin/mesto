import '../../pages/index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  setting,
  elementsSelector,
  templateSelector,
  addButton,
  editButton,
  profile
} from '../utils/constants.js';

import { formValidators, enableValidation } from '../utils/utils.js';

enableValidation(setting);

const createCard = (item) => {
  const card = new Card(item, templateSelector, popupImage.open.bind(popupImage));
  return card.generateCard();
}

const profileInfo = new UserInfo(profile);
const popupImage = new PopupWithImage('.popup_type_element');
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitter: (data) => {
    profileInfo.setUserInfo(data);
    popupProfile.close();
  }
});

const popupPlace = new PopupWithForm({
  popupSelector: '.popup_type_place',
  submitter: (data) => {
    const card = createCard(data);
    cardList.addItem(card);
    popupPlace.close();
  }
});

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, elementsSelector);

cardList.renderItems();

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();

addButton.addEventListener('click', () => {
  formValidators[popupPlace._form.getAttribute('name')].resetValidation();
  popupPlace.open();
});

editButton.addEventListener('click', () => {
  formValidators[popupProfile._form.getAttribute('name')].resetValidation();
  const inputValue = profileInfo.getUserInfo();
  popupProfile._inputList.forEach(input => input.value = inputValue[input.id]);
  popupProfile.open();
})
