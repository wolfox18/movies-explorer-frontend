import { WINDOW_SIZE_BIG, WINDOW_SIZE_SMALL, SHORTS_DURATION, SHOW_BIG_AMOUNT, SHOW_MEDIUM_AMOUNT, SHOW_SMALL_AMOUNT, ADD_BIG_AMOUNT, ADD_SMALL_AMOUNT } from "./constants";
export const filterMovies = (movies, key, isShort) => {
  const filteredMovies = movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(key.toLowerCase()) &&
      (!isShort || movie.duration <= SHORTS_DURATION)
  );
  return filteredMovies;
};
export const howManyShow = () => {
  const windiwSize = window.innerWidth;
  if (windiwSize > WINDOW_SIZE_BIG) {
    return SHOW_BIG_AMOUNT;
  } else if (windiwSize > WINDOW_SIZE_SMALL) {
    return SHOW_MEDIUM_AMOUNT;
  } else {
    return SHOW_SMALL_AMOUNT;
  }
};
export const howManyAdd = () => {
  const windiwSize = window.innerWidth;
  if (windiwSize > WINDOW_SIZE_BIG) {
    return ADD_BIG_AMOUNT;
  } else {
    return ADD_SMALL_AMOUNT;
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
