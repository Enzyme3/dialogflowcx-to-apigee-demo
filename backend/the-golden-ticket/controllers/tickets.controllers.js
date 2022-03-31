const config = require('../config');

const tickets = config.ticketsSold || {};

const createTicket = (req, res, next) => {
  ticketId = `KP-${Math.floor(Math.random() * config.ticket.idMax)
      .toString().padStart(config.ticket.idMax.toString().length, '0')}`;

  ticket = {
    id: ticketId,
    movie: req.body.movie,
    city: req.body.city,
    date: req.body.date,
    showtime: req.body.showtime,
  };
  tickets[ticketId] = ticket;

  res.status(200).json(ticket);
};

const getTicket = (req, res, next) => {
  if (!(req.params.ticketId in tickets)) {
    res.status(404).json({
      error: `Ticket: ${req.params.ticketId} Not Found`,
    });
  }

  res.status(200).json(tickets[req.params.ticketId]);
};

module.exports = {
  createTicket,
  getTicket,
};
