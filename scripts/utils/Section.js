class Section {
    constructor({ data, renderer }, container) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = container;
    };

    renderCards() {
        this._renderedItems.forEach(item => this._renderer(item));
    };

    addCard(element) {
        this._container = document.querySelector('.elements__list');
        this._container.append(element);
    };
}

export default Section