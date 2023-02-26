export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this.__handleEscClose = this._handleEscClose.bind(this);
    };

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup", handleEscClose());
    };

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", handleEscClose());
    };

    _handleEscClose(evt) {
        evt.preventDefault();
        if (evt.key === 'Escape') {
            this.closePOpup();
        }

    };

    setEventListeners() {
        this._popup
            .querySelector('.close-icon')
            .addEventListener('click', this.closePopup);

        this._popup.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('.popup')) {
                this.closePopup();
            }
        });
    }
}