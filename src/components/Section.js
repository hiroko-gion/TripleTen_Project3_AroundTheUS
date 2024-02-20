export default class Section {
  constructor({ items, renderer }, containerElement) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerElement);
  }

  //Iterate over the items array and render them
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //Add DOM element to the container
  addItem(element) {
    this._container.prepend(element);
  }
}
