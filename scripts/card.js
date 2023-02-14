import { popupOpenImage, popupImage, popupImageTitle } from "../scripts/index.js"

class Card {
	constructor(template, item, openPopup) {
		this._template = template;
		this._name = item.name;
		this._link = item.link;
		this._openPopup = openPopup;
	}

	_getTemplate() {
		const cardElement = document.querySelector('.element__template')
			.content
			.querySelector('.element')
			.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._element.querySelector('.element__name').textContent = this._name;
		this._element.querySelector('.element__img').src = this._link;
		this._element.querySelector('.element__img').alt = this._name;
		this._setEventListeners();
		return this._element;
	}

	_deleteCard() {
		this._element.remove();
	}

	_likeCard() {
		this._element.querySelector('.element__like').classList.toggle('element__like_active');
	}

	_openPopupImg() {
		popupImage.src = this._link;
		popupImageTitle.textContent = this._name;
		popupImage.alt = this._name;
		this._openPopup(popupOpenImage);
	}
	_setEventListeners() {
		this._element.querySelector('.element__trash').addEventListener('click', () => {
			this._deleteCard();
		});
		this._element.querySelector('.element__like').addEventListener('click', () => {
			this._likeCard();
		});
		this._element.querySelector('.element__img').addEventListener('click', () => {
			this._openPopupImg(popupOpenImage);
		});

	};
}

export default Card