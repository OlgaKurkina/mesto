class Section {
    constructor({ data, renderer }, sectionSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(sectionSelector);
    };

    renderCards() {
        this._renderedItems.forEach(item => this._renderer(item));
    };

    addCard(element) {
        this._container.append(element);
    };
}

export default Section