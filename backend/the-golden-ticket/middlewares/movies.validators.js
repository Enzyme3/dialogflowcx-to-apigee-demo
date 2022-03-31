const {query, validationResult} = require('express-validator');

exports.getMoviesNowShowing = [
  query('city', 'missing parameter city').exists(),
  query('date', 'invalid date').isDate(),
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
