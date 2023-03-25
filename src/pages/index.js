import "../pages/index.css"

import {
  config,
  profileForm,
  formAddNewCard,
  profileEditButton,
  popupAddButton,
  nameInput,
  jobInput,
  popupEditUserAvatar,
  popupUpdateAvatar
}
  from "../utils/constants.js"

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api.js"

const profilePopupValidation = new FormValidator(config, profileForm);
const popupAddValidation = new FormValidator(config, formAddNewCard);
const avatarFormValidator = new FormValidator(config, popupUpdateAvatar);

const popupWithAddCard = new PopupWithForm({
  popup: ".popup_add-new",
  handleFormSubmit: (data) => {
    popupWithAddCard.handleLoading(true);
    api.addNewCard({
      name: data['element-name'],
      link: data['element-link']
    })
      .then((newItem) => {
        const card = createCard(newItem);
        cardList.addCard(card);
        popupWithAddCard.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAddCard.handleLoading(false);
      });
  }
});

let userId
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.addCard(card)
  },
}, '.elements__list');

const api = new Api({
  basePath: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '9fcb3909-3689-4058-8869-85eda4cfd0db',
    "Content-Type": "application/json"
  }
});

Promise.all([api.getCards(), api.getUserData()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  })

//функция создания карточки
function createCard(item) {
  const newCard = new Card({
    item,
    template: config.selectorTemplate,
    userId,
    handleCardClick: () =>
      popupWithImage.openPopup(item),
    handlePopupFormSubmit: (itemId) =>
      confirmationPopup.openPopup(itemId),
    handleLikeCard: (card) => {
      if (card.isLikedCard()) {
        api.unsetLike(card._id)
          .then((item) => {
            card.updateLikes(item.likes)
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.setLike(card._id)
          .then((item) => {
            card.updateLikes(item.likes)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
  const cardElement = newCard.generateCard();
  return cardElement;
};

const confirmationPopup = new PopupWithSubmit({
  popup: '.popup_form-submit',
  handleFormSubmit: (item) => {
    api.deleteMyCard(item._id)
      .then(() => {
        item.deleteCard();
        confirmationPopup.closePopup();
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

const userInfo = new UserInfo({
  userName: '.profile__user-name',
  userJob: '.profile__user-description',
  profileAvatar: '.profile__image',
});

const popupWithProfile = new PopupWithForm({
  popup: '.profile-popup',
  handleFormSubmit: ({ name, about, _id }) => {
    popupWithProfile.handleLoading(true);
    api.updateUserData({ name, about, _id })
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupWithProfile.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithProfile.handleLoading(false)
      });
  }
});

const popupWithImage = new PopupWithImage({
  popup: ".popup_open-img"
});

const popupEditAvatar = new PopupWithForm({
  popup: '.popup_edit-avatar',
  handleFormSubmit: ({ avatar }) => {
    popupEditAvatar.handleLoading(true);
    api.updateUserAvatar({ avatar })
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditAvatar.closePopup()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.handleLoading(false)
      });
  }
})

profilePopupValidation.enableValidation();
popupAddValidation.enableValidation();
avatarFormValidator.enableValidation();

popupWithAddCard.setEventListeners();
popupWithProfile.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
confirmationPopup.setEventListeners()

//открываем попап по клику на кнопку
popupAddButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupWithAddCard.openPopup();
  popupAddValidation.resetValidation()
});

profileEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  const { about, name } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  popupWithProfile.openPopup();
  profilePopupValidation.resetValidation()
});

popupEditUserAvatar.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupEditAvatar.openPopup();
  avatarFormValidator.resetValidation()
})


