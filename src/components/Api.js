export class Api {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
      }

getUserInfo() {
    return fetch(`${this._address}/users/me`, {
        method: 'GET',
        headers: this._headers
    })
    .then(res => this._getResponseData(res))
}

getInitialCards() {
    return fetch(`${this._address}/cards`, {
        method: 'GET',
        headers: this._headers
    })
    .then(res => this._getResponseData(res))
}

setUserInfo(formData) {
    return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: formData.name,
            about: formData.description
        })
    })
    .then(res => this._getResponseData(res))
}

createCard(formData) {
    return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: formData.name,
            link: formData.link
        })
    })
    .then(res => this._getResponseData(res))
}

removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => this._getResponseData(res))
}

 likeStanding(cardId, like) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
        method: like ? 'DELETE' : 'PUT',
        headers: this._headers,
    })
    .then(res => this._getResponseData(res))
}

updateAvatar(formData) {
    return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: formData.avatar
        })
    })
    .then(res => this._getResponseData(res))
}
}