class FormValidator {
	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;
		this._buttonElement = formElement.querySelector(config.submitButtonSelector);
		this._inactiveButtonClass = config.inactiveButtonClass;
	}

	//показываем ошибки
	_showInputError(inputElement) {
		const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		formError.classList.add(this._errorClass);
		formError.textContent = inputElement.validationMessage;
	}

	//метод скрытия ошибки
	_hideInputError = (inputElement) => {
		const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		formError.classList.remove(this._errorClass);
		formError.textContent = '';
	};

	//метод проверки валидности формы
	_checkInputValidity = (inputElement) => {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		}
		else {
			this._hideInputError(inputElement);
		}
	};

	//метод проверки, есть ли хотя бы один инпут с невалидными данными
	_hasInvalidInput = () => {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid
		});
	};

	//метод отключения кнопки при открытии формы
	_disabledButton() {
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.setAttribute("disabled", "disabled");
	};

	//метод переключения кнопки
	_toggleButtonState = () => {

		if (this._hasInvalidInput()) {
			this._disabledButton()
		}
		else {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.removeAttribute("disabled", "disabled");
		};
	};

	_setEventListeners = () => {
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	};

	//метод проверки валидности каждой формы и показа/скрытия ошибок 
	enableValidation() {
		this._formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
			this._disabledButton();
		});
		this._setEventListeners();
	};

}

export default FormValidator
