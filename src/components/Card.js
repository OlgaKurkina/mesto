class Card {
	constructor({ item, template, handleCardClick, openPopup, handlePopupFormSubmit }) {
		this._template = template;
		this._name = item.name;
		this._link = item.link;
		this._id = item.id;
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector('.element__img');
		this._cardTitile = this._element.querySelector('.element__name');
		this._handleCardClick = handleCardClick;
		this._openPopup = openPopup;
		this._likeButton = this._element.querySelector('.element__like');
		this._deleteButton = this._element.querySelector('.element__trash');
		this._isOwner = item.owner._id;
		this._handlePopupFormSubmit = handlePopupFormSubmit
	}

	//получаем разметку
	_getTemplate() {
		const cardElement = document.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);
		return cardElement;
	}

	//создаем карточку
	generateCard() {
		this._cardTitile.textContent = this._name;
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._isOwner = this.owner._id;
		this._likeCounter = document.querySelector('.element__like-counter')
		this._setEventListeners();
		if (!this._isOwner) {
			this._element.classList.add('element__trash_hidden');
		}
		return this._element;
	}

	//метод удаления карточки
	deleteCard() {

		this._element.remove()
	}

	//метод установка лайка
	_likeCard() {
		this._likeButton.classList.toggle('element__like_active');
	}

	countLikes(data) {
		this._likeCounter.textContent = data.length
	}

	//слушатели событый
	_setEventListeners() {
		this._deleteButton.addEventListener('click', () => {

			this._handlePopupFormSubmit();
		});
		this._likeButton.addEventListener('click', () => {
			this._likeCard();
		});
		this._cardImage.addEventListener('click', () => {
			this._handleCardClick();
		});

	};
}

export default Card