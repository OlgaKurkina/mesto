class Api {
  constructor({ basePath, headers }) {
    this._basePath = basePath;
    this._headers = headers;
  }

  //получение ответа от сервера
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение карточки с сервера
  getCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._headers,
    })
      .then(this._getJson);
  }

  //добавление новой карточки на сервер
  addNewCard(data) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then(this._getJson);
  }

  //получение данных пользователя
  getUserData() {
    return fetch(`${this._basePath}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._getJson);
  }

  //обновление данных пользователя 
  updateUserData(data) {
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(this._getJson);
  }

  //обновление аватара
  updateUserAvatar(avatar) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
      .then(this._getJson);
  }

  //удаление карточки
  deleteMyCard(id) {
    return fetch(`${this._basePath}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._getJson);
  }

  //ставим лайк
  setLike(id, card) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(card),
    })
      .then(this._getJson);
  }

  //удаляем лайк
  unsetLike(id, card) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify(card),
    })
      .then(this._getJson);
  }
}

export default Api;