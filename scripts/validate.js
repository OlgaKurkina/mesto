const objectValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, objectValidation) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectValidation.inputErrorClass);
  formError.classList.add(objectValidation.errorClass);
  formError.textContent = errorMessage;
};

//функция скрытия ошибки
const hideInputError = (formElement, inputElement, objectValidation) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectValidation.inputErrorClass);
  formError.classList.remove(objectValidation.errorClass);
  formError.textContent = '';
};

//функция проверки валидности формы
const checkInputValidity = (formElement, inputElement, objectValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectValidation);
  }
  else {
    hideInputError(formElement, inputElement, objectValidation);
  }
};

//функция проверки, есть ли хотя бы один инпут с невалидными данными
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

//функция переключения кнопки
const toggleButtonState = (inputList, buttonElement, objectValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectValidation.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }
  else {
    buttonElement.classList.remove(objectValidation.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  };
};

const setEventListeners = (formElement, objectValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(objectValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objectValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, objectValidation);
      toggleButtonState(inputList, buttonElement, objectValidation);
    });
  });
};

//функция отключения кнопки при открытии формы
function disabledButton(formElement, objectValidation) {
  const buttonElement = formElement.querySelector(objectValidation.submitButtonSelector);
  buttonElement.classList.remove(objectValidation.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};

//функция проверки валидности каждой формы и показа/скрытия ошибок 
const enableValidation = (objectValidation) => {
  const formList = Array.from(document.querySelectorAll(objectValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      disabledButton(formElement, objectValidation);
    });
    setEventListeners(formElement, objectValidation);
  });
};

enableValidation(objectValidation);
