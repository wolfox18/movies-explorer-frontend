import { MOVIE_URL } from "./utils";

class MovieApi {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Ошибка внутри API!" + res);
  }
  getMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers
      },
    ).then(this._handleResponse);
  }
}

export const movieApi = new MovieApi({
  baseUrl: MOVIE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})