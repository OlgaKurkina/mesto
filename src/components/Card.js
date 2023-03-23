class Card {
  constructor({ item, template, userId, handleCardClick, handlePopupFormSubmit, handleLikeCard }) {
    this._template = template;
    this._name = item.name;
    this._link = item.link;
    this._id = item._id;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__img');
    this._cardTitile = this._element.querySelector('.element__name');
    this._handleCardClick = handleCardClick;
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__trash');
    this._isOwner = item.owner._id === userId;
    this._handlePopupFormSubmit = handlePopupFormSubmit;
    this._handleLikeCard = handleLikeCard;
    this._likes = item.likes;
    this._userId = userId;
    this._likeCounter = this._element.querySelector('.element__like-counter')
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
    this._setEventListeners();
    if (!this._isOwner) {
      this._element.querySelector('.element__trash').remove();
    }
    this.setLikeData();

    return this._element;
  }

  isLikedCard() {
    return this._likes.some(like => like._id === this._userId)
  }

  setLikeData() {
    if (this.isLikedCard()) {
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
    this._likeCounter.textContent = this._likes.length
  }

  countLikes(data) {
    this._likeCounter.textContent = data.length
  }

  deleteCard() {
    this._element.remove()
  }

  updateLikes(likes) {
    this._likes = likes;
    console.log(this._likes)
    this.setLikeData()
    this.countLikes(likes)
  }
  //слушатели событый
  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handlePopupFormSubmit(this);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

  };
}

export default Card
