const express = require('express');
const asyncHandler = require('express-async-handler');
const { models } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

// Get all of the current user's trips
router.get('/:id', asyncHandler(async (req,res) => {
    const userId = req.params.id;
    let trips = await models.Trip.findAll({
      where: {
        userId: {
          [Op.eq]:userId
        }
      },
      include: [models.Site]
    });
  
    return res.json(trips);
}))

// Create a trip
router.post('/:id',asyncHandler(async (req,res) => {
    const { userId, siteId, startDate, endDate } = req.body
    const newTrip = await models.Trip.build({ 
      userId,
      siteId,
      startDate,
      endDate,
    })
    let tripExists = false

    let userTrips = await models.Trip.findAll({
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

      let trip = await models.Trip.findOne({
        where: {
          id: newTrip.id
        },
        include: [models.Site]
      })
      return res.json(trip)
    }

}))

// Delete a trip
router.delete('/:id/:id',asyncHandler(async (req, res) => {
  const url = req.url;
  const params = url.split('/');
  const tripId = params[2];
  const trip = await models.Trip.findByPk(tripId);

  await trip.destroy();
  
  return res.json(trip)
}))


module.exports = router;

