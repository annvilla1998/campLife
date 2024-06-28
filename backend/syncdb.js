const Review = require('./db/models/review');
const Site = require('./db/models/site');
const Trip = require('./db/models/trip');
const User = require('./db/models/user');

Review.sync({ force: true});
Site.sync({ force: true});
Trip.sync({ force: true});
User.sync({ force: true});

