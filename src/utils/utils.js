export const API_URL = "http://movi-api.nomoredomains.club";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies"

export const filterMovies = (movies, key, isShort) => {
  // console.log("Started function filterMovies");
  // console.log("movies length - ", movies.length);
  // console.log("key = ", key);
  // console.log("isShort = ", isShort);
  const filteredMovies = movies.filter(movie => movie.nameRU.includes(key) && (!isShort || movie.duration <= 40));
  // console.log("filtered length - ", filteredMovies.length);
  // console.log("Ended function filterMovies");
  return filteredMovies;
}
export const howManyShow = () => {
  const windiwSize = window.innerWidth;
  if (windiwSize > 1077) {
    return 12;
  } else if (windiwSize > 632) {
    return 8;
  } else {
    return 5;
  }
}
export const howManyAdd = () => {
  const windiwSize = window.innerWidth;
  if (windiwSize > 1077) {
    return 3;
  } else {
    return 2;
  }
}
export const durationToString = (durationMinutes) => {
  let durationString = "";
  if (durationMinutes >= 60) {
    durationString += Math.floor(durationMinutes / 60);
    durationString += " ч ";
  }
  durationString += (durationMinutes % 60);
  durationString += " м";
  return durationString;
}