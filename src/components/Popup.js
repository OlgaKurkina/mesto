export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
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
        this._popupSelector.addEventListener('click', (event) => {
            if (event.target.classList.contains("popup")) {
                this.closePopup();
            };
        });
    }

    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener("keyup", this._handleEscClose);
    };

    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    };

    setEventListeners() {
        this._popupSelector.querySelector('.close-icon').addEventListener('click', this.closePopup.bind(this));

        this._popupSelector.addEventListener('click', this._closeOverlay());
    }
}
