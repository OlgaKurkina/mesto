class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  };

  renderCards(items) {
    items.forEach(item =>
      this._renderer(item));
  };

  addCard(element) {
    this._container.prepend(element);
  };
}

export default Section