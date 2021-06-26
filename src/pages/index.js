import {popupEdit, popupAddCard, profileOpenButton, popupAddCardButton, inputName, inputJob, newName,
   newJob, editProfileForm, newCardForm, popupPhoto, renderElements, cardsTemplate, validationConfig,
   popupEditAvatar, popupRemoveConfirm, userAvatar, popupEditAvatarOpened, editAvatarForm} from '../utils/constants.js';
import {FormValidator}  from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupRemoveConfirm} from '../components/PopupRemoveConfirm.js';
import './index.css';

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, newCardForm);
addCardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, editAvatarForm);
avatarFormValidator.enableValidation();
const popupImage = new PopupWithImage(popupPhoto);
let userId = null;

const api = new Api ({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
  authorization: '680bd78d-11d7-4092-977f-23afe781bd9e',
  'Content-Type': 'application/json'
  },
});

const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cardData.reverse());
  })
  .catch((e) => console.log(`Ошибка: ${e}`))

const userInfo = new UserInfo({
  userName: newName,
  userJob: newJob,
  avatar: userAvatar
});

const popupEditProfile = new PopupWithForm({
  popupSelector: popupEdit,
  submitHandler: (data) => {
    popupEditProfile.saveButtonIsLoading(true);
    api.setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      popupEditProfile.saveButtonIsLoading(false);
    })
  },
});

const updateAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  submitHandler: (formData) => {
    updateAvatar.saveButtonIsLoading(true);
    api.updateAvatar(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        updateAvatar.close();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        updateAvatar.saveButtonIsLoading(false);
      })
  }
})

const popupNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  submitHandler: (formData) => {
    popupNewCard.saveButtonIsLoading(true);
    api.createCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewCard.saveButtonIsLoading(false);
      })
  },
});

const popupRemoveCard = new PopupRemoveConfirm(popupRemoveConfirm, (cardData) => {
  api.removeCard(cardData.cardId)
  .then(() => {
    cardData.card.remove();
    popupRemoveCard.close();
  })
  .catch((e) => {
    console.log(e);
  })
})

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
},
renderElements
);

function createCard(item) {
  const cardExample = new Card({
    data: item, 
    handlerCardOpen: (link, name) => {popupImage.open(link, name)},
    handlerRemoveCard: (cardData, cardId) => {popupRemoveCard.open(cardData, cardId);
    },
    handlerLikeClick: (cardId, like) => {
      api.likeStanding(cardId, like)
        .then((card) => {
          cardExample.likeData(card);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  },
  cardsTemplate, userId);
  const cardElement = cardExample.getTemplate();
  return cardElement;
};

popupAddCardButton.addEventListener('click', () => {
  popupNewCard.open();
  addCardFormValidator.resetValidation();
});

profileOpenButton.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().userName;
  inputJob.value = userInfo.getUserInfo().userJob;
  editProfileFormValidator.toggleButtonState();
  popupEditProfile.open();
  editProfileFormValidator.resetValidation();
});

popupEditAvatarOpened.addEventListener('click', () => {
  updateAvatar.open();
  avatarFormValidator.toggleButtonState();
  avatarFormValidator.resetValidation();
})

popupImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
updateAvatar.setEventListeners();
popupRemoveCard.setEventListeners();
