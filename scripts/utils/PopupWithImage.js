import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    //  constructor(popup, item) {
    //      super(popup);
    //      this._name = item.name;
    //      this._image = item.link;
    //  }

    open(name, link) {
        this._image.src = link;
        this._name.textContent = name;
        this._image.alt = name;
        super.open();
    }
}

export default PopupWithImage