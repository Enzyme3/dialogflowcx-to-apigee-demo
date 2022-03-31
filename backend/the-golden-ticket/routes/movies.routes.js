const express = require('express');
const router = new express.Router();

const moviesValidator = require('../middlewares/movies.validators');
const moviesControllers = require('../controllers/movies.controllers.js');

router.get('/',
    moviesValidator.getMoviesNowShowing,
    moviesControllers.getMoviesNowShowing);

module.exports = router;
