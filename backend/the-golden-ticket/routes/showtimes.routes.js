const express = require('express');
const router = new express.Router();

const showtimesValidator = require('../middlewares/showtimes.validators');
const showtimesControllers = require('../controllers/showtimes.controllers.js');

router.get('/',
    showtimesValidator.getMovieShowtimes,
    showtimesControllers.getMovieShowtimes,
);

router.post('/validate',
    showtimesValidator.validateShowtime,
    showtimesControllers.validateShowtime,
);

module.exports = router;
