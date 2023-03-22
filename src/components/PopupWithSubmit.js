import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super(popup);
        this._formSubmit = document.querySelector('.popup_form-submit');
        this._handleFormSubmit = handleFormSubmit;

    }

    setEventListeners() {
        super.setEventListeners();
        this._formSubmit.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleFormSubmit()
        })

    }

}

export default PopupWithSubmit