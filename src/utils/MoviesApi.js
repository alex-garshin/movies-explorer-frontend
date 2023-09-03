import { MOVIES_BASE_URL } from "./constants";

class MoviesApi {
  constructor(options) {
    this._movieUrl = options.movieUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._movieUrl}/beatfilm-movies`, {
      method: "GET",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const moviesApi = new MoviesApi({
  movieUrl: MOVIES_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
