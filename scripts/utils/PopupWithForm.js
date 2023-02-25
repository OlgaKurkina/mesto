import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, handleAddFormSubmit) {
        super(popup);
        this._handleAddFormSubmit = handleAddFormSubmit;
    }


    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", this._handleAddFormSubmit());
    }

    close() {
        super.close();
        this._element.reset();
    }
}

export default PopupWithForm