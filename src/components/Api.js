class Api {
    constructor(basePath, token) {
        this._basePath = basePath;
        this._token = token
    }

    _getHeaders() {
        return {
            authorization: this._token,
            "Content-Type": "application/json",
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //получили карточки с сервера
    getCards() {
        return fetch(`${this._basePath}/cards`, {
            headers: this._getHeaders(),
        })
            .then(this._getJson);
    }

    //добавили новую карточку на сервер
    addNewCard(data) {
        return fetch(`${this._basePath}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
            .then(this._getJson);

    }

    //получили данные пользователя
    getUserData() {
        return fetch(`${this._basePath}/users/me`, {
            method: "GET",
            headers: this._getHeaders(),
        })
            .then(this._getJson);
    }

    //обновляем данные пользователя 
    updateUserData(data) {
        return fetch(`${this._basePath}/users/me`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        })
            .then(this._getJson);
    }

    //обновили аватар
    updateUserAvatar(avatar) {
        return fetch(`${this._basePath}/users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify(avatar),
        })
            .then(this._getJson);
    }

    //удаление карточки
    deleteMyCard(id) {
        return fetch(`${this._basePath}/cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        })
            .then(this._getJson);
    }
    //ставим лайк
    setLike() {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._getHeaders(),
        })
            .then(this._getJson);
    }
    //удаляем лайк
    unsetLike() {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._getHeaders(),
        })
            .then(this._getJson);
    }
}
export default Api;