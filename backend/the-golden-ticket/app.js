const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const moviesRouter = require('./routes/movies.routes');
const showtimesRouter = require('./routes/showtimes.routes');
const ticketsRouter = require('./routes/tickets.routes');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get(['/', '/healthcheck'], (req, res) => {
  res.status(200).json({
    message: `howdy howdy howdy`,
  });
});

app.use('/movies', moviesRouter);
app.use('/showtimes', showtimesRouter);
app.use('/tickets', ticketsRouter);

app.use(function(req, res, next) {
  res.status(404).json({
    message: `No such route exists: ${req.path}`,
  });
});

app.listen(config.express.port, () => {
  console.log(`The Golden Ticket API is up at port ${config.express.port}`);
});
