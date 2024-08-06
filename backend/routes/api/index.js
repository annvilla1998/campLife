const router = require('express').Router();

const sessionRouter = require('./session');
const usersRouter = require('./users.js');
const sitesRouter = require('./sites.js');
const reviewsRouter = require('./reviews.js');
const tripsRouter = require('./trips.js');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/sites', sitesRouter);
router.use('/reviews', reviewsRouter);
router.use('/trips', tripsRouter);


module.exports = router;