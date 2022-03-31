const config = {};

config.express = {};
config.express.port = 8080;

config.movies = [
  'Parasite',
  'Slumdog Millionaire',
  'The Departed',
  'The Lord of the Rings',
  'Titanic',
  'Forrest Gump',
  'The Silence of the Lambs',
];

config.showtimes = [
  '11:00 AM',
  '12:00 PM',
  '1:30 PM',
  '3:00 PM',
  '5:30 PM',
  '8:00 PM',
  '9:00 PM',
];

config.ticket = {};
config.ticket.idMax = 999;

config.ticketsSold = {
  'KP-213': {
    'id': 'KP-213',
    'movie': 'Spiderman',
    'city': 'Los Angeles',
    'year': 2021,
    'month': 11,
    'day': 17,
    'time': '11:00 AM',
  },
  'KP-323': {
    'id': 'KP-323',
    'movie': 'Parasite',
    'city': 'Irvine',
    'year': 2019,
    'month': 5,
    'day': 30,
    'time': '9:00 PM',
  },
};

module.exports = config;
