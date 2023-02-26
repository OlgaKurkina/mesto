import '../pages/index.css';

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"

const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

const config = {
	selectorTemplate: '.element__template',
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active'
}

export const popupOpenImage = document.querySelector(".popup_open-img"); // попап открытия картинки
export const popupImage = popupOpenImage.querySelector(".popup__image");
export const popupImageTitle = popupOpenImage.querySelector(".popup__image-title");
const profilePopup = document.querySelector(".profile-popup"); // попап профиля
const popupAddNewCard = document.querySelector(".popup_add-new"); // попап добавления картинки
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const profileAddButton = document.querySelector(".profile__add-button");
const elementContainer = document.querySelector(".elements__list");
const formAddCard = document.forms['form_add_card']; // форма добавления картинки
const profileForm = document.forms['profile-form']; //форма редактирования профиля
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(".profile__user-description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_element-name");
const linkInput = document.querySelector(".popup__input_type_element-link");
const profilePopupValidation = new FormValidator(config, profilePopup);
const addPopupValidation = new FormValidator(config, popupAddNewCard);

const popupWithForm = new PopupWithForm(popupAddNewCard, handleFormSubmit);
const popupWithProfile = new PopupWithForm(profilePopup, handleFormSubmit);
const popupWithImage = new PopupWithImage(popupOpenImage);

const userInfo = new UserInfo({
	userName: '.popup__input_type_name',
	userJob: '.popup__input_type_job'
});

profilePopupValidation.enableValidation();
addPopupValidation.enableValidation();

popupWithForm.setEventListeners();
popupWithProfile.setEventListeners();
popupWithImage.setEventListeners();

//открываем попап по клику на кнопку
profileAddButton.addEventListener("click", (evt) => {
	evt.preventDefault();
	popupWithForm.openPopup();
});

profileEditButton.addEventListener("click", (evt) => {
	evt.preventDefault();
	popupWithProfile.openPopup();
});

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	const info = userInfo.getUserInfo();
	profileUserName.textContent = nameInput.value;
	profileUserDescription.textContent = jobInput.value;
	popupWithProfile.closePopup();
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

//функция создания карточки
function createCard(item) {
	const newCard = new Card({
		item,
		template: config.selectorTemplate,
		handleCardClick: () =>
			popupWithImage.openPopup(item)
	});
	const cardElement = newCard.generateCard();

	return cardElement;
};

//функция добавления нового элемента в начало
function addElement(newElement) {
	elementContainer.prepend(newElement);
};

const cardList = new Section({
	data: initialCards,
	renderer: (item) => {
		const card = createCard(item);
		cardList.addCard(card)
	},
}, '.elements__list');

cardList.renderCards();

function handleFormSubmit(event) {
	event.preventDefault();

	const newCard = createCard({
		name: titleInput.value,
		link: linkInput.value,
	});
	addElement(newCard);
	popupWithForm.closePopup();
	event.target.reset();
};

formAddCard.addEventListener("submit", handleFormSubmit);
