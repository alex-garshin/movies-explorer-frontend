import { getFromLocalStorage } from "./utils";
import { BASE_URL } from "./constants";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const error = await res.text();
    return Promise.reject(`Ошибка: ${JSON.parse(error).message}`);
  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  checkUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeUserData({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  delMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateToken() {
    this._headers.Authorization = `Bearer ${getFromLocalStorage("jwt")}`;
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getFromLocalStorage("jwt")}`,
  },
});

export default mainApi;
