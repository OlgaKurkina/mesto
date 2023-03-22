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
//const popupFormSubmit = document.querySelector('.popup_form-submit') // попап с подтверждением
const elementTrashBtn = document.querySelector('.popup__button_delete-img');
const profilePopupValidation = new FormValidator(config, profilePopup);
const popupAddValidation = new FormValidator(config, popupAddNewCard);

const popupWithForm = new PopupWithForm({
	popup: ".popup_add-new",
	handleFormSubmit: (data) => {
		handleLoading(".popup_add-new", true);
		api.addNewCard({
			name: data['element-name'],
			link: data['element-link']
		})
			.then((newItem) => {
				const card = createCard(newItem)
				cardList.addCard(card);
				handleLoading(popupWithForm, false);
			})
			.catch((err) => {
				console.log(err);
			});
		popupWithForm.closePopup();
	}
});

let userId

//функция создания карточки
function createCard(item) {
	const newCard = new Card({
		item,
		template: config.selectorTemplate,
		userId,
		handleCardClick: () =>
			popupWithImage.openPopup(item),
		handlePopupFormSubmit: () =>
			popupFormSubmit.openPopup(),
		handleLikeCard: (card) => {
			if (card.isLikedCard()) {
				api.unsetLike(card)
					.then((card) => {
						card.setLikeData(card);
						updateLikes()
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				api.setLike(card)
					.then((card) => {
						card.setLikeData(card);
						updateLikes()
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
	handleFormSubmit: (id) => {
		handleLoading('.popup_form-submit', true);
		api.deleteMyCard(id)
			.then((card) => {
				card.remove();
				popupFormSubmit.closePopup();
				handleLoading('.popup_form-submit', false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
})

popupFormSubmit.setEventListeners()

const userInfo = new UserInfo({
	userName: '.profile__user-name',
	userJob: '.profile__user-description',
	profileAvatar: '.profile__image'
});

const popupWithProfile = new PopupWithForm({
	popup: '.profile-popup',
	handleFormSubmit: (data) => {
		handleLoading('.profile-popup', true);
		api.updateUserData(data)
			.then((userData) => {
				userInfo.setUserInfo(userData);
				handleLoading('.profile-popup', false)
			})
			.catch((err) => {
				console.log(err);
			});

		popupWithProfile.closePopup();
	}
});

const popupWithImage = new PopupWithImage({
	popup: ".popup_open-img"
});

const popupEditAvatar = new PopupWithForm({
	popup: '.popup_edit-avatar',
	handleFormSubmit: (data) => {
		handleLoading('.popup_edit-avatar', true);
		api.updateUserAvatar(data)
			.then((data) => {
				userInfo.setUserAvatar({
					avatar: data['avatar']
				});
				handleLoading('.popup_edit-avatar', false)
			})
			.catch((err) => {
				console.log(err);
			});
		popupEditAvatar.closePopup()
	}
})

//функция смены названия кнопки
function handleLoading(popup, isLoading) {
	const btnLoading = document.querySelector(popup).querySelector('.popup__button')
	if (isLoading) {
		btnLoading.textContent = 'Сохранение...'
	} else { btnLoading.textContent = 'Готово' }
}

profilePopupValidation.enableValidation();
popupAddValidation.enableValidation();

popupWithForm.setEventListeners();
popupWithProfile.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();

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
		console.log(userData)
		userInfo.setUserInfo(userData);
		userInfo.setUserAvatar({ avatar: userData.avatar });
		cardList.renderCards(cards);

	})
	.catch((err) => {
		console.log(err);
	})

