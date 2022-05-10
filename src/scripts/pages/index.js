import '../../pages/index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  setting,
  elementsSelector,
  templateSelector,
  addButton,
  editProfileButton,
  editAvatarButton,
  profile,
  options
} from '../utils/constants.js';

import { formValidators, enableValidation } from '../utils/utils.js';

enableValidation(setting);

const profileInfo = new UserInfo(profile);
const api = new Api(options);
const initialProfile = api.getInitialProfileInfo();
const initialCards = api.getInitialCards();

let cardList = null;

const popupImage = new PopupWithImage('.popup_type_element');

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitter: (data) => {
    const {'profile-name': name, 'profile-title': job} = data;
    api.editProfile(name, job)
      .then(data => {
        const {'name': name, 'about': job} = data;
        profileInfo.setUserInfo({name, job});
        popupProfile.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
});

const popupPlace = new PopupWithForm({
  popupSelector: '.popup_type_place',
  submitter: (data) => {
    const {'place-name': name, 'place-url': link} = data;
    api.postCard({name, link})
      .then((data) => {
        const card = createCard(data, api._userId);
        cardList.addItem(card);
        popupPlace.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
});

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submitter: (data) => {
    const {'avatar-url': link} = data;
    api.editAvatar(link)
      .then((data) => {
        const {'avatar': src} = data;
        profileInfo.setAvatar(src);
        popupAvatar.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
});

const popupConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  confirmDeletion: () => {
    const cardId = popupConfirmation.getCardId();
    api.deleteElement(cardId)
      .then(res => {
        if (res.ok) {
          popupConfirmation.deleteCard();
          popupConfirmation.close();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
      .catch((err) => console.log(err));
  }
})

const createCard = (item, userId) => {
  const card = new Card(
    item,
    templateSelector,
    popupImage.open.bind(popupImage),
    popupConfirmation.open.bind(popupConfirmation),
    api.handleLikeClick.bind(api)
  );
  const cardElement = card.generateCard(userId);
  return cardElement;
}

Promise.all([initialProfile, initialCards])
  .then(data => {
    const nameJob = {name: data[0].name, job: data[0].about };
    profileInfo.setUserInfo(nameJob);
    profileInfo.setAvatar(data[0].avatar);

    cardList = new Section({
      items: data[1],
      renderer: (item) => {
        const card = createCard(item, api._userId);
        cardList.addItem(card);
      }
    }, elementsSelector);

    cardList.renderItems();
  })

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatar.setEventListeners();

addButton.addEventListener('click', () => {
  formValidators[popupPlace._form.getAttribute('name')].resetValidation();
  popupPlace.open();
});

editProfileButton.addEventListener('click', () => {
  formValidators[popupProfile._form.getAttribute('name')].resetValidation();
  const inputValue = profileInfo.getUserInfo();
  popupProfile._inputList.forEach(input => input.value = inputValue[input.id]);
  popupProfile.open();
})

editAvatarButton.addEventListener('click', () => {
  formValidators[popupAvatar._form.getAttribute('name')].resetValidation();
  const inputValue = profileInfo.getAvatar();
  popupAvatar._inputList.forEach(input => input.value = inputValue[input.id]);
  popupAvatar.open();
})
