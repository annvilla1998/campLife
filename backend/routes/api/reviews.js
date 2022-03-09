const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

const router = express.Router();


// //get all reviews
// router.get('/', asyncHandler(async(req,res) => {
//     const reviews = await Review.findAll()

//     return res.json(reviews)
// }))

// //post a review
// router.post('/', requireAuth, asyncHandler(async(req,res) => {

//     const { userId, siteId, review, rating } = req.body;
//     const newReview = await Review.create({
//         userId,
//         siteId,
//         review,
//         rating
//     })
//     res.redirect(`${req.baseUrl}/`)
// }))


// //edit a review

// //delete a review


module.exports = router