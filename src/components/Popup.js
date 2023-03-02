export default class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    //закрытие по esc
    _handleEscClose(event) {
        event.preventDefault();
        if (event.key === 'Escape') {
            this.closePopup();
        }
    };
    //закрытие по оверлей
    _closeOverlay() {
        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains("popup")) {
                this.closePopup();
            };
        });
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup", this._handleEscClose);
    };

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    };

    setEventListeners() {
        this._popup.querySelector('.close-icon').addEventListener('click', this.closePopup.bind(this));
        this._closeOverlay()
    }
}
