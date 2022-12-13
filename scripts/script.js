const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.profile__edit-button');
const popupClose = popup.querySelector('.close-icon');
let userName = document.querySelector('.profile__user-name');
let userDescription = document.querySelector('.profile__user-description');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let popupSubmit = document.querySelector('.popup__button');

popupEdit.addEventListener('click', (evt) => {
  evt.preventDefault();
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  popup.classList.add('popup_opened');
})

popupClose.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popupSubmit.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})