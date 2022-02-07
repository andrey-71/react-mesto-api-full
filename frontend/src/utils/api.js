class Api {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._receiveRequestHeaders = options.receiveRequestHeaders
    this._sendRequestHeaders = options.sendRequestHeaders;
  }

  // Общий запрос всех данных с сервера
  getAppInfo() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  // Получение данных пользователя
  _getUserInfo() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._receiveRequestHeaders
    })
      .then(res => this._handleResult(res));
  }

  // Получение начальных карточек
  _getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._receiveRequestHeaders
    })
      .then(res => this._handleResult(res));
  }

  // Отправка данных пользователя
  setUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._sendRequestHeaders,
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
      headers: this._sendRequestHeaders,
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
      headers: this._sendRequestHeaders,
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
      headers: this._receiveRequestHeaders
    })
      .then(res => this._handleResult(res));
  }

  // Установка/снятие лайка
  setLikeCard(card, isLiked) {
    if (isLiked) {
      return fetch(`${this._serverUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: this._sendRequestHeaders
      })
        .then(res => this._handleResult(res));
    } else {
      return fetch(`${this._serverUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: this._receiveRequestHeaders
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
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  receiveRequestHeaders: {
    authorization: '47bf35c3-c8a1-495a-9dd2-8537c372d068'
  },
  sendRequestHeaders: {
    authorization: '47bf35c3-c8a1-495a-9dd2-8537c372d068',
    'Content-Type': 'application/json'
  }
});

export default api;