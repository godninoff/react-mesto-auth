import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
	constructor({popupSelector, submitHandler}) {
		super(popupSelector)
		this._submitHandler = submitHandler;
		this._form = this._popup.querySelector('.popup__form');
		this._formInputs = this._popup.querySelectorAll('.popup__input');
		this._popupSaveButton = this._popup.querySelector('.popup__save-button');
		this._popupSaveButtonLoading = this._popupSaveButton.textContent;
	}

	_getInputValues() {
		this._inputValues = {};
		this._formInputs.forEach(input => {
			this._inputValues[input.name] = input.value
		});

		return this._inputValues;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitHandler(this._getInputValues());
		})
	};

	saveButtonIsLoading(load) {
		if(load) {
			this._popupSaveButton.textContent = 'Сохранение...';
		} else {
			this._popupSaveButton.textContent = this._popupSaveButtonLoading;
		}
	}

	close() {
		super.close();
		this._form.reset();
	}
}

