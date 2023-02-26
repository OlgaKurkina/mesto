import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }

    open(item) {
        this._popupImage.src = item.link;
        this._popupImageTitle.textContent = item.name;
        this._popupImage.alt = item.name;
        super.open();
    }
}

export default PopupWithImage