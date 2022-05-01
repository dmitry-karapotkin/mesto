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
  editButton
} from '../utils/constants.js';

import { formValidators, enableValidation } from '../utils/utils.js';

enableValidation(setting);

const profileInfo = new UserInfo('.profile-info__name','.profile-info__job');
const popupImage = new PopupWithImage('.popup_type_element');
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitter: (evt) => {
    evt.preventDefault();
    const nameJob = popupProfile._getInputValues();
    profileInfo.setUserInfo(nameJob);
    formValidators[popupProfile._form.getAttribute('name')].resetValidation();
    popupProfile.close();
  }
});

const popupPlace = new PopupWithForm({
  popupSelector: '.popup_type_place',
  submitter: (evt) => {
    evt.preventDefault();
    const {firstInput: name, secondInput: link } = popupPlace._getInputValues();
    const card = new Card({name, link}, templateSelector, popupImage.open.bind(popupImage));
    cardList.addItem(card.generateCard());
    popupPlace._form.reset();
    popupPlace.close();
  }
});

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, popupImage.open.bind(popupImage));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementsSelector);

cardList.renderItems();

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();

addButton.addEventListener('click', popupPlace.open.bind(popupPlace));
editButton.addEventListener('click', () => {
  profileInfo.getUserInfo(popupProfile);
  popupProfile.open();
})
