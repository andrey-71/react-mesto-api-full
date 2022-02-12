class Auth {
  constructor(serverUrl) {
    this._serverUrl = serverUrl;
  }

  // Регистрация пользователя
  register(data) {
    return fetch(`${this._serverUrl}/signup`, {
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
    return fetch(`${this._serverUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
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
  checkLocalStorage(email) {
    return fetch(`${this._serverUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${email}`
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

const auth = new Auth('https://mesto-backend.andrey-g.nomoredomains.xyz');
export default auth;