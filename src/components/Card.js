export class Card {
    constructor({data, handlerCardOpen, handlerRemoveCard, handlerLikeClick},
       cardSelector, userId) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handlerCardOpen = handlerCardOpen;
        this._handlerRemoveCard = handlerRemoveCard;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardLike = handlerLikeClick;
        this._ownerId = data.owner._id;
        this._userId = userId;
    }

    getTemplate() {
        this._element = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element').cloneNode(true);
        const cardElement = this._element.querySelector('.element__image');
        this._like = this._element.querySelector('.element__like');
        this._cardRemove = this._element.querySelector('.element__remove');
        this._element.querySelector('.element__name').textContent = this._name;
        this._likeCounter();
        this._setEventListeners();
        this._removeCardHandler();
        cardElement.src = this._link;
        cardElement.alt = this._name;
        return this._element;
    }

  _setEventListeners() {
    this._cardRemove.addEventListener('click', () => {
      this._handlerRemoveCard({cardId: this._cardId, card: this._element});
    })
    this._like.addEventListener('click', () => {
      this._handlerLikeClick();
    })
    this._element.querySelector('.element__image')
    .addEventListener('click',  () => {
      this._handlerCardOpen({name: this._name, link: this._link});
    })
  }  

  _likeCounter() {
    this._element.querySelector('.element__like-counter')
    .textContent = this._likes.length;
    if(this.likeCard()) {
      this._like.classList.add('element__like_toggle-active')
    } else {
      this._like.classList.remove('element__like_toggle-active')
    }
  }

  likeCard() {
    return Boolean(this._likes.find(
      (item) => item._id === this._userId))
  }

  likeData(data) {
    this._likes = data.likes;
    this._likeCounter();
  }

  _handlerLikeClick() {
    this._likeCounter();
    this._cardLike(this._cardId, this.likeCard())
  }

  _removeCardHandler() {
    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__remove').remove();
    }
  }
}