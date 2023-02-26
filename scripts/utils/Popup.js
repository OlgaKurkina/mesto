export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    //закрытие по esc
    _handleEscClose(event) {
        event.preventDefault();
        if (event.key === 'Escape') {
            this.closePopup();
        }
    };

    _closeOverlay() {
        const popupList = Array.from(document.querySelectorAll('.popup'));
        popupList.forEach((popupItem) => {
            popupItem.addEventListener('click', (event) => {
                if (event.target.classList.contains("popup")) {
                    this.closePopup();
                };
            });
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

        this._popup.addEventListener('click', this._closeOverlay());
    }
}
