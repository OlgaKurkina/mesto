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

const profilePopup = document.querySelector(".profile-popup"); // попап профиля
const popupAddNewCard = document.querySelector(".popup_add-new"); // попап добавления картинки
const popupOpenImage = document.querySelector(".popup_open-img"); // попап открытия картинки
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const profileEditCloseButton = profilePopup.querySelector(".close-icon"); //кнопка закрытия профиля
const popupAddNewCardCloseButton = popupAddNewCard.querySelector('.close-icon'); // кнопка закрытия попап с добавлением фото
const popupOpenImageCloseButton = popupOpenImage.querySelector('.close-icon'); //кнопка закрытия фотографии
const profileAddButton = document.querySelector(".profile__add-button");
const elementContainer = document.querySelector(".elements__list");
const elementTemplate = document.querySelector(".element__template").content.querySelector(".element");
const formAddCard = document.forms['form_add_card']; // форма добавления картинки
const profileForm = document.forms['profile-form']; //форма редактирования профиля
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageTitle = popupOpenImage.querySelector(".popup__image-title");
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(".profile__user-description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const popupSubmit = profilePopup.querySelector(".popup__button");
const titleInput = document.querySelector(".popup__input_type_element-name");
const linkInput = document.querySelector(".popup__input_type_element-link");

function openPopup(classAdd) {
  classAdd.classList.add("popup_opened");
};

function closePopup(classRemove) {
  classRemove.classList.remove("popup_opened");
};

profileEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserDescription.textContent;
  openPopup(profilePopup);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

profileAddButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openPopup(popupAddNewCard);
});

popupAddNewCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddNewCard);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserDescription.textContent = jobInput.value;
  closePopup(profilePopup);
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

function deleteElement(event) {
  event.target.closest(".element").remove();
};

function likeElement(event) {
  event.target.closest(".element__like").classList.toggle("element__like_active");
};

function addCardEventListeners(newElement) {
  const buttonLike = newElement.querySelector(".element__like");
  const buttonDelete = newElement.querySelector(".element__trash");
  buttonLike.addEventListener("click", likeElement);
  buttonDelete.addEventListener("click", deleteElement);
};

function createCards(element) {
  const newElement = elementTemplate.cloneNode(true);
  const popupOpenPic = newElement.querySelector(".element__img");
  newElement.querySelector(".element__name").textContent = element.name;
  popupOpenPic.src = element.link;
  popupOpenPic.alt = element.name;
  popupOpenPic.addEventListener("click", () => {
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupImageTitle.textContent = element.name;
    openPopup(popupOpenImage);
  });
  addCardEventListeners(newElement);
  return newElement;
};

popupOpenImageCloseButton.addEventListener("click", () => {
  closePopup(popupOpenImage);
});

function addElement(newElement) {
  elementContainer.prepend(newElement);
};

function renderElements() {
  initialCards.forEach((element) => {
    const elementHTML = createCards(element);
    elementContainer.append(elementHTML);
  });
};

function handleAddFormSubmit(event) {
  event.preventDefault();

  const newCard = createCards({
    name: titleInput.value,
    link: linkInput.value,
  });
  addElement(newCard);
  event.target.reset();
  closePopup(popupAddNewCard);
};

formAddCard.addEventListener("submit", handleAddFormSubmit);
renderElements();