import {Popup} from './Popup.js';
export class PopupRemoveConfirm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
      }
    
      open(cardData) {
        super.open();
        this._cardData = cardData;
      }
    
      setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitHandler(this._cardData);
        })
      }
    }