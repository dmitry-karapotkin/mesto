import './index.css';

import Card from '../scripts/components/Card.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import FormValidator from '../scripts/components/FormValidator.js';

import {
  setting,
  elementsSelector,
  templateSelector,
  addButton,
  editProfileButton,
  editAvatarButton,
  profile,
  options
} from '../scripts/utils/constants.js';

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

enableValidation(setting);

const profileInfo = new UserInfo(profile);
const api = new Api(options);
const initialProfile = api.getInitialProfileInfo().catch(err => console.log(err));;
const initialCards = api.getInitialCards().catch(err => console.log(err));;

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
      .catch(err => console.log(err));
  }
});

const popupPlace = new PopupWithForm({
  popupSelector: '.popup_type_place',
  submitter: (data) => {
    const {'place-name': name, 'place-url': link} = data;
    api.postCard({name, link})
      .then((data) => {
        const card = createCard(data, api.userId);
        cardList.addItem(card);
        popupPlace.close();
      })
      .catch(err => console.log(err));
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
      .catch(err => console.log(err));
  }
});

const popupConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  confirmDeletion: (card) => {
    console.log(card);
    api.deleteElement(card.id)
      .then(() => {
        popupConfirmation.deleteCard();
        popupConfirmation.close();
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
  .then(([userData, initialCards]) => {
    const nameJob = {name: userData.name, job: userData.about };
    profileInfo.setUserInfo(nameJob);
    profileInfo.setAvatar(userData.avatar);

    cardList = new Section({
      items: initialCards,
      renderer: (item) => {
        const card = createCard(item, api.userId);
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
  formValidators[popupPlace.getFormName()].resetValidation();
  popupPlace.open();
});

editProfileButton.addEventListener('click', () => {
  formValidators[popupProfile.getFormName()].resetValidation();
  const inputValue = profileInfo.getUserInfo();
  popupProfile.setInputValues(inputValue);
  popupProfile.open();
})

editAvatarButton.addEventListener('click', () => {
  formValidators[popupAvatar.getFormName()].resetValidation();
  popupAvatar.open();
})
