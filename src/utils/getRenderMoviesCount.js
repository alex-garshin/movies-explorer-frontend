export default function getRenderMoviesCount() {
  let countMovies = 0;
  const clientWidth = document.documentElement.clientWidth;
  const countMoviesSettings = {
    1279: [16, 4], // 'разрешение экрана': [начальное количество фильмов, загружаемое количество по клику "Ещё"]
    989: [12, 3],
    763: [8, 2],
    480: [5, 1],
    319: [5, 2],
  };

  Object.keys(countMoviesSettings)
    .sort((initial, add) => initial - add)
    .forEach((i) => {
      if (clientWidth > +i) {
        countMovies = countMoviesSettings[i];
      }
    });

  return countMovies;
}
