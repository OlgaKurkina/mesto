class Section {
	constructor({ data, renderer }, container) {
		this._renderedItems = data;
		this._renderer = renderer;
		this._container = document.querySelector(container);
	};

	renderCards() {
		this._renderedItems.forEach(item => this._renderer(item));
	};

	addCard(element) {
		this._container.prepend(element);
	};
}

export default Section