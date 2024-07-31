const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const User = require('../../db/models/user');
const Trip = require('../../db/models/trip');
const Site = require('../../db/models/site');
const Review = require('../../db/models/review');
const { Op } = require("sequelize");

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .withMessage("Please provide an email")
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage("Please provide a password")
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    })
  );

router.get('/:id/trips',asyncHandler(async (req,res) => {
    const userId = req.params.id
    let trips = await Trip.findAll({
      where: {
        userId: {
          [Op.eq]:userId
        }
      },
      include: [Site]
    })
  
    return res.json(trips)
}))


router.post('/:id/trips',asyncHandler(async (req,res) => {
    const { userId, siteId, startDate, endDate } = req.body
    const newTrip = await Trip.build({ 
      userId,
      siteId,
      startDate,
      endDate,
    })
    let tripExists = false

    let userTrips = await Trip.findAll({
      where: {
        userId: {
          [Op.eq]:userId
        }
      }
    })
    
    
    for(let i = 0; i < userTrips.length; i++){
      let trip = userTrips[i]
      if(trip.siteId === siteId){
        tripExists = true
      }
    }
    
    if(tripExists) {
      return res.json({"errors": ["You already have a scheduled trip to this Campsite!"]});
    }else{
      await newTrip.save()

      let trip = await Trip.findOne({
        where: {
          id: newTrip.id
        },
        include: [Site]
      })
      return res.json(trip)
    }

    // })
    // if() {
    //   return res.json(newTrip)
    // }else {
    //   return 
    // }

}))

router.delete('/:id/trips/:id',asyncHandler(async (req, res) => {
  const url = req.url;
  const params = url.split('/');
  const tripId = params[3];
  const siteId = params[1];
  const trip = await Trip.findByPk(tripId);

  await trip.destroy();
  
  return res.json(trip)
}))


module.exports = router;

