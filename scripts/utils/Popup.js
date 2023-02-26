export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this.__handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup", handleEscClose());
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", handleEscClose());
    };

    _handleEscClose(evt) {
        evt.preventDefault();
        if (evt.key === 'Escape') {
            this.close();
        }

    };

    setEventListeners() {
        this._popup
            .querySelector('.close-icon')
            .addEventListener('click', this.close);

        this._popup.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('.popup')) {
                this.close();
            }
        });
    }
}