const utils = require('../utils');
const config = require('../config');

const getMovieShowtimes = (req, res, next) => {
  if (!config || !config.showtimes || config.showtimes.length <= 0) {
    res.status(500).json({
      message: `Error loading available movies. Please try again later`,
    });
  }

  hashInput = `${req.query.movie}-${req.query.city}-${req.query.date}`;
  hash = utils.hashCode(hashInput);

  const movieShowtimes = [];
  for (const showtime of config.showtimes) {
    const temp = hash % 10;
    if (temp >= 5) {
      movieShowtimes.push(showtime);
    }
    hash = Math.floor(hash / 10);
  }

  // just add 2 showtimes from the arr if none are added to list
  if (movieShowtimes.length == 0) {
    movieShowtimes.push(config.movies[1]);
    movieShowtimes.push(config.movies[3]);
  }

  res.status(200).json({
    showtimes: movieShowtimes,
    count: movieShowtimes.length,
  });
};

const validateShowtime = (req, res, next) => {
  movieShowtimes = getMovieShowtimes(
      req.body.movie,
      req.body.city,
      req.body.date,
  );

  if (!movieShowtimes.includes(req.body.showtime)) {
    return res.status(404).json({
      error: `No showtimes for ${req.body.movie} on that location/date`,
    });
  }

  res.status(200).json({
    showtime: req.body.showtime,
    movie: req.body.movie,
    city: req.body.city,
    date: req.body.date,
  });
};

module.exports = {
  getMovieShowtimes,
  validateShowtime,
};
