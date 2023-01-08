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

const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".profile__edit-button");
const popupClose = popup.querySelector(".close-icon");
const popupNew = document.querySelector(".popup_add-new");
const popupAdd = document.querySelector(".profile__add-button");
const popupCloseAddButton = popupNew.querySelector(".close-icon");
const elementContainer = document.querySelector(".elements__list");
const elementTemplate = document.querySelector(".element__template").content.querySelector(".element");
const formAdd = document.querySelector(".popup__form-add");
const popupImg = document.querySelector(".popup_open-img");
const popupClosePic = popupImg.querySelector(".close-icon");
const popupImage = popupImg.querySelector(".popup__image");
const popupTitle = popupImg.querySelector(".popup__image-title");

let userName = document.querySelector(".profile__user-name");
let userDescription = document.querySelector(".profile__user-description");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let popupSubmit = document.querySelector(".popup__button");

popupEdit.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  popup.classList.add("popup_opened");
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

popupAdd.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupNew.classList.add("popup_opened");
});

popupCloseAddButton.addEventListener("click", () => {
  popupNew.classList.remove("popup_opened");
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleFormSubmit);

function deleteElement(event) {
  event.target.closest(".element").remove();
}

function likeElement(event) {
  event.target.closest(".element__like").classList.toggle("element__like_active");
}

function popupOpenImg() {
  popupImg.classList.add("popup_opened");
}

function addCardEventListeners(newElement) {
  const buttonLike = newElement.querySelector(".element__like");
  const buttonDelete = newElement.querySelector(".element__trash");
  buttonLike.addEventListener("click", likeElement);
  buttonDelete.addEventListener("click", deleteElement);
}

function createCards(element) {
  const newElement = elementTemplate.cloneNode(true);
  const popupOpenPic = newElement.querySelector(".element__img");
  newElement.querySelector(".element__name").textContent = element.name;
  newElement.querySelector(".element__img").src = element.link;
  popupOpenPic.addEventListener("click", () => {
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupTitle.textContent = element.name;
    popupOpenImg();
    popupClosePic.addEventListener("click", () => {
      popupImg.classList.remove("popup_opened");
    });
  });

  addCardEventListeners(newElement);
  return newElement;
}

function addElement(newElement) {
  elementContainer.prepend(newElement);
}

function renderElements() {
  initialCards.forEach((element) => {
    const elementHTML = createCards(element);
    elementContainer.append(elementHTML);
  });
}

function addFormSubmit(event) {
  event.preventDefault();
  const titleInput = document.querySelector(".popup__input_type_element-name").value;
  const linkInput = document.querySelector(".popup__input_type_element-link").value;
  const newCard = createCards({
    name: titleInput,
    link: linkInput,
  });

  addElement(newCard);
  event.target.reset();
  popupNew.classList.remove("popup_opened");
}

formAdd.addEventListener("submit", addFormSubmit);
renderElements();