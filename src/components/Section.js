export class Section {
	constructor({renderer}, containerSelector) {
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	  }
	
	  renderItems(cards) {
		cards.forEach(card => {
			this._renderer(card);
		})
	  }
	
	  addItem(elem) {
		this._container.prepend(elem)
	}
}