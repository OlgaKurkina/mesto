export default class Popup {
    constructor(popup) {
        this._popup = popup;
    };

    open() {
        this._popup.classList.add('popup_opened');

    };

    close() {
        this._popup.classList.remove('popup_opened');
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
            .addEventListener('click', this.close.bind(this));

        this._popup.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('.popup')) {
                this.close();
            }
        });
    }
}