import "../pages/index.css"

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api"

const config = {
  selectorTemplate: '.element__template',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const profilePopup = document.querySelector(".profile-popup"); // попап профиля
const popupAddNewCard = document.querySelector(".popup_add-new"); // попап добавления картинки
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const popupAddButton = document.querySelector(".profile__add-button");
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(".profile__user-description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const popupEditUserAvatar = document.querySelector('.profile__avatar-button') // кнопка редактирования аватара
const popupUpdateAvatar = document.querySelector('.popup_edit-avatar')
const profilePopupValidation = new FormValidator(config, profilePopup);
const popupAddValidation = new FormValidator(config, popupAddNewCard);
const popupChangeAvatar = new FormValidator(config, popupUpdateAvatar);

const popupWithForm = new PopupWithForm({
  popup: ".popup_add-new",
  handleFormSubmit: (data) => {
    popupWithForm.handleLoading(true);
    api.addNewCard({
      name: data['element-name'],
      link: data['element-link']
    })
      .then((newItem) => {
        const card = createCard(newItem)
        cardList.addCard(card);
        popupWithForm.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithForm.handleLoading(false);
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

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-61',
  '9fcb3909-3689-4058-8869-85eda4cfd0db'
);

Promise.all([api.getCards(), api.getUserData()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar({ avatar: userData.avatar });
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
      popupFormSubmit.openPopup(itemId),
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

const popupFormSubmit = new PopupWithSubmit({
  popup: '.popup_form-submit',
  handleFormSubmit: (item) => {
    api.deleteMyCard(item._id)
      .then(() => {
        item.deleteCard();
        popupFormSubmit.closePopup();
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
  handleFormSubmit: (data) => {
    popupWithProfile.handleLoading(true);
    api.updateUserData(data)
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
  handleFormSubmit: (data) => {
    popupEditAvatar.handleLoading(true);
    api.updateUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar({
          avatar: data['avatar']
        });
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

//функция смены названия кнопки
//function handleLoading(popupSelector, isLoading) {
//  const btnLoading = document.querySelector(popupSelector).querySelector('.popup__button');
//  console.log(document.querySelector(popupSelector));
//  if (isLoading) {
//    btnLoading.textContent = 'Сохранение...'
//  } else { btnLoading.textContent = 'Готово' }
//}

profilePopupValidation.enableValidation();
popupAddValidation.enableValidation();
popupChangeAvatar.enableValidation();

popupWithForm.setEventListeners();
popupWithProfile.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupFormSubmit.setEventListeners()

//открываем попап по клику на кнопку
popupAddButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupWithForm.openPopup();
  popupAddValidation.disabledButton();
});

profileEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserDescription.textContent;
  popupWithProfile.openPopup();
});

popupEditUserAvatar.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupEditAvatar.openPopup();
})


