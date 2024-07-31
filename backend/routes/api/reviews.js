const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Review = require('../../db/models/review');
const router = express.Router();


const validatePostReview = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a rating")
        .isInt({ min: 0, max: 5 })
        .withMessage("Please enter a number 1-5"),
    handleValidationErrors
]

// Get all reviews
router.get('/:id/review', asyncHandler(async(req,res) => {
    const siteId = parseInt(req.params.id, 10)
    // const site = await Site.findByPk(siteId)
    const reviews = await Review.findAll({
        where: {
            siteId: siteId
        }
    })

    return res.json(reviews)
}))


// Post a review
router.post('/:id/review', requireAuth, validatePostReview, asyncHandler(async(req,res) => {
    // const site = await Site.findByPk(req.params.id)
    
    const { userId, review, rating, siteId } = req.body;

    const newReview = await Review.create({
        userId,
        siteId,
        review,
        rating
    })

    res.redirect(`/api/sites/${siteId}`)
}))

// Edit a review
router.patch('/review/:id', requireAuth, validatePostReview, asyncHandler(async(req,res) => {
    const id = parseInt(req.params.id, 10)
    const { userId, siteId, rating, review } = req.body
    const oldReview = await Review.findByPk(id)
    await oldReview.update({
        userId,
        siteId, 
        rating,
        review
    })
    return res.json(oldReview)
}))

// Delete a review
router.delete('/review/:id', requireAuth, asyncHandler(async (req,res) => {
    const review = await Review.findByPk(req.params.id)

    await review.destroy()
    return res.json(review)
}))

module.exports = router;