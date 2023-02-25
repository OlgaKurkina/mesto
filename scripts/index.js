import Card from "./utils/Card.js"
import FormValidator from "./utils/FormValidator.js"
import Section from "./utils/Section.js"
import PopupWithImage from "./utils/PopupWithImage.js"
import PopupWithForm from "./utils/PopupWithForm.js"
import UserInfo from "./utils/UserInfo.js"

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
	errorClass: 'popup__input-error_active',
	elementsList: '.elements__list'
}

export const popupOpenImage = document.querySelector(".popup_open-img"); // попап открытия картинки
export const popupImage = popupOpenImage.querySelector(".popup__image");
export const popupImageTitle = popupOpenImage.querySelector(".popup__image-title");
const profilePopup = document.querySelector(".profile-popup"); // попап профиля
const popupAddNewCard = document.querySelector(".popup_add-new"); // попап добавления картинки
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const profileAddButton = document.querySelector(".profile__add-button");
const elementContainer = document.querySelector(config.elementsList);
const formAddCard = document.forms['form_add_card']; // форма добавления картинки
const profileForm = document.forms['profile-form']; //форма редактирования профиля
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(".profile__user-description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_element-name");
const linkInput = document.querySelector(".popup__input_type_element-link");
const closeButtons = document.querySelectorAll('.close-icon'); // находим все крестики проекта по универсальному селектору
const profilePopupValidation = new FormValidator(config, profilePopup);
const addPopupValidation = new FormValidator(config, popupAddNewCard);

profilePopupValidation.enableValidation();
addPopupValidation.enableValidation();

//вешаем слушатель на форму и записываем введенные данные в инпуты
//profileEditButton.addEventListener("click", (evt) => {
//	evt.preventDefault();
//	nameInput.value = profileUserName.textContent;
//	jobInput.value = profileUserDescription.textContent;
//	open(profilePopup);
//});

// Создадим нового пользователя
const userInfo = new UserInfo({ userName: nameInput, userJob: jobInput });

//функция открытия попапа профиля и занесения  информации в инпуты
profileEditButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	const info = userInfo.getUserInfo();
	setUserInfo({ //вызывали ф-ю добавления значений из инпутов
		userName: info.userName,
		userJob: info.userJob
	});
	open(profilePopup);
});

//функция создания карточки
function createCard(item) {
	const newCard = new Card(config.selectorTemplate, item, openPopupImg)
	const cardElement = newCard.generateCard();
	return cardElement;
};

//функция добавления нового элемента в начало
function addElement(card) {
	//elementContainer.prepend(newElement);
	cardList.addCard(card)
};

function handleAddFormSubmit(evt) {
	evt.preventDefault();

	const newCard = createCard({
		name: titleInput.value,
		link: linkInput.value,
	});
	addElement(newCard);
	close(popupAddNewCard);
	evt.target.reset();
};

const popupWithForm = new PopupWithForm(popupAddNewCard, handleAddFormSubmit);
popupWithForm.setEventListeners();

const popupWithProfile = new PopupWithForm(profilePopup, handleAddFormSubmit);
popupWithProfile.setEventListeners();

const popupWithImage = new PopupWithImage(item, popupOpenImage);
popupWithImage.setEventListeners();

popupImage.addEventListener('click', () => {
	popupWithImage.open();
})

const cardList = new Section({
	data: initialCards,
	renderer: (item) => {
		const card = createCard(item);
		cardList.addCard(card)
	},
}, '.elements__list');

cardList.renderCards();

//formAddCard.addEventListener("submit", handleAddFormSubmit);
renderElements();