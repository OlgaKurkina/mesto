const Popup = document.querySelector('.popup');
const PopupEdit = document.querySelector('.profile__edit-button');
const PopupClose = Popup.querySelector('.close-icon');
let nameInfo = document.querySelector('.profile__user-name');
let jobInfo = document.querySelector('.profile__user-description');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

PopupEdit.addEventListener('click', (evt) => {
    evt.preventDefault();
    Popup.classList.add('popup_opened')
})

PopupClose.addEventListener('click', () => {
    Popup.classList.remove('popup_opened')
})

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
