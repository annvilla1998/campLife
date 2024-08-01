const {models} = require('./db/models');

models.Review.sync({ force: true});
models.Site.sync({ force: true});
models.Trip.sync({ force: true});
models.User.sync({ force: true});

