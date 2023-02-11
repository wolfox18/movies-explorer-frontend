import { API_URL } from "./constants.js";

class MainApi {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }
  _getToken() {
    return localStorage.getItem("jwt");
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.status);
  }
  authorise(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._handleResponse);
  }
  getMe() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  patchMe({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
      body: JSON.stringify({ name, email }),
    }).then(this._handleResponse);
  }
  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
  addMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    }).then(this._handleResponse);
  }
  deleteMovie({ movieId }) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
