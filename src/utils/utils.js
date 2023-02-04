export const API_URL = "http://movi-api.nomoredomains.club";
// export const API_URL = "http://localhost:3102";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const filterMovies = (movies, key, isShort) => {
  const filteredMovies = movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(key.toLowerCase()) &&
      (!isShort || movie.duration <= 40)
  );
  return filteredMovies;
};
export const howManyShow = () => {
  const windiwSize = window.innerWidth;
  if (windiwSize > 1077) {
    return 12;
  } else if (windiwSize > 632) {
    return 8;
  } else {
    return 5;
  }
};
export const howManyAdd = () => {
  const windiwSize = window.innerWidth;
  if (windiwSize > 1077) {
    return 3;
  } else {
    return 2;
  }
};
export const durationToString = (durationMinutes) => {
  let durationString = "";
  if (durationMinutes >= 60) {
    durationString += Math.floor(durationMinutes / 60);
    durationString += " ч ";
  }
  durationString += durationMinutes % 60;
  durationString += " м";
  return durationString;
};
