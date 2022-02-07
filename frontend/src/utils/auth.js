class Auth {
  constructor(serverAuthUrl) {
    this._serverAuthUrl = serverAuthUrl;
  }

  // Регистрация пользователя
  register(data) {
    return fetch(`${this._serverAuthUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._handleResult(res))
  }

  // Авторизация пользователя
  authorize(data) {
    return fetch(`${this._serverAuthUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._handleResult(res))
  }

  // Проверка корректности токена, получение email пользователя
  checkToken(token) {
    return fetch(`${this._serverAuthUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => this._handleResult(res))
  }


  // Обработчик результата запроса
  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`"${res.status} ${res.statusText}"`);
  }
}

const auth = new Auth('https://auth.nomoreparties.co');
export default auth;