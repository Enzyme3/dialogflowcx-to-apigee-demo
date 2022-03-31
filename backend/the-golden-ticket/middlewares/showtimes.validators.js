const {query, body, validationResult} = require('express-validator');

exports.getMovieShowtimes = [
  query('movie', 'missing parameter movie').exists(),
  query('city', 'missing parameter city').exists(),
  query('date', 'invalid date').exists().isDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: `Bad Request`,
        errorReason: errors.array(),
      });
    }
    next();
  },
];

exports.validateShowtime = [
  // time in AM/PM format
  body('showtime', 'missing parameter showtime').exists()
      .matches(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/),
  body('movie', 'missing parameter movie').exists(),
  body('city', 'missing parameter city').exists(),
  body('date', 'invalid date').exists().isDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: `Bad Request`,
        errorReason: errors.array(),
      });
    }
    next();
  },
];
