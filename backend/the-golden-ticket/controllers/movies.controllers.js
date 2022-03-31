const utils = require('../utils');
const config = require('../config');

const getMoviesNowShowing = (req, res, next) => {
  if (!config || !config.movies || config.movies.length <= 0) {
    res.status(500).json({
      message: `Error loading available movies. Please try again later`,
    });
  }

  hashInput = `${req.query.city}-${req.query.date}`;
  hash = utils.hashCode(hashInput);

  const moviesNowShowing = [];
  for (const movie of config.movies) {
    const temp = hash % 10;
    if (temp >= 5) {
      moviesNowShowing.push(movie);
    }
    hash = Math.floor(hash / 10);
  }

  // just add 2 movies from the arr if none are added to list
  if (moviesNowShowing.length == 0) {
    moviesNowShowing.push(config.movies[0]);
    moviesNowShowing.push(config.movies[2]);
  }

  moviesNowShowing.sort();

  res.status(200).json({
    movies: moviesNowShowing,
    count: moviesNowShowing.length,
  });
};

module.exports = {
  getMoviesNowShowing,
};
