const express = require('express');
const router = new express.Router();

const ticketsValidator = require('../middlewares/tickets.validators');
const ticketsControllers = require('../controllers/tickets.controllers.js');

router.post('/',
    ticketsValidator.createTicket,
    ticketsControllers.createTicket);

router.get('/:ticketId',
    ticketsControllers.getTicket);

module.exports = router;
