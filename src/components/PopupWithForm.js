import Popup from "./Popup.js"

class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._btnLoading = this._popup.querySelector('.popup__button');
    this._btnLoadingText = this._btnLoading.textContent;
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  handleLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._btnLoading.textContent = loadingText;
    } else {
      this._btnLoading.textContent = this._btnLoadingText
    }
  }
}

export default PopupWithForm