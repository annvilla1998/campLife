const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const Review = require('../../db/models/review');
const { restoreUser,requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session');
const usersRouter = require('./users.js');
const sitesRouter = require('./sites.js');
const reviewsRouter = require('./reviews.js');
// const tripsRouter = require('./trips.js')



router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/sites', sitesRouter);
router.use('/reviews', reviewsRouter);

// router.use('/trips', tripsRouter)


// router.get('/review/:id/edit', asyncHandler(async(req,res)=> {
//     const id = parseInt(req.params.id, 10);
//     const review = await Review.findByPk(id)
//     return res.json(review)
// }))

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//     console.log(user, "sdjaoisdjoaeirfjoseifjosdifjosdifj")
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));



module.exports = router;