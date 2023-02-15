class Card {
	constructor(template, item, openPopupImg) {
		this._template = template;
		this._name = item.name;
		this._link = item.link;
		this._openPopupImg = openPopupImg;
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector('.element__img');
		this._cardTitile = this._element.querySelector('.element__name');
		this._likeButton = this._element.querySelector('.element__like');
		this._deleteButton = this._element.querySelector('.element__trash');
	}

	_getTemplate() {
		const cardElement = document.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);
		return cardElement;
	}

	generateCard() {
		this._cardTitile.textContent = this._name;
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._setEventListeners();
		return this._element;
	}

	_deleteCard() {
		this._element.remove();
	}

	_likeCard() {
		this._likeButton.classList.toggle('element__like_active');
	}

	_setEventListeners() {
		this._deleteButton.addEventListener('click', () => {
			this._deleteCard();
		});
		this._likeButton.addEventListener('click', () => {
			this._likeCard();
		});
		this._cardImage.addEventListener('click', () => {
			this._openPopupImg(this._name, this._link);
		});

	};
}

export default Card