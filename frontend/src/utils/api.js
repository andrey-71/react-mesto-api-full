class Api {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._headers = options.headers
  }

  // Общий запрос всех данных с сервера
  getAppInfo() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  // Получение данных пользователя
  _getUserInfo() {
    return fetch(`${this._serverUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._handleResult(res));
  }

  // Получение начальных карточек
  _getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._handleResult(res));
  }

  // Отправка данных пользователя
  setUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleResult(res));
  }

  // Отправка аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._handleResult(res));
  }

  // Отправка новой карточки
  setNewCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleResult(res));
  }

  // Удаление карточки
  deleteCard(data) {
    return fetch(`${this._serverUrl}/cards/${data._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._handleResult(res));
  }

  // Установка/снятие лайка
  setLikeCard(card, isLiked) {
    if (isLiked) {
      return fetch(`${this._serverUrl}/cards/${card._id}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers
      })
        .then(res => this._handleResult(res));
    } else {
      return fetch(`${this._serverUrl}/cards/${card._id}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
        .then(res => this._handleResult(res));
    }
  }


  // Обработчик результата запроса
  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`"${res.status} ${res.statusText}"`);
  }
}

const api = new Api({
  serverUrl: 'https://mesto-backend.andrey-g.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;