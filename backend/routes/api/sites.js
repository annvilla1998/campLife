const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Site, Review, Trip } = require('../../db/models');
const router = express.Router();
// const fs = require('fs')
// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)
// const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' })
const { multipleMulterUpload,
    multiplePublicFileUpload } = require('../../utils/s3')



const validateCreateSite = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Please provide an address"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a city"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a state"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a country"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a name"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a price"),
    handleValidationErrors
]

const validatePostReview = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a rating")
        .isInt({ min: 0, max: 5 })
        .withMessage("Please enter a number 1-5"),
    handleValidationErrors
]


//view all sites
router.get('/', asyncHandler(async (req, res) => {
    const sites = await Site.findAll();
    return res.json({
        sites
    })
}))

//post a new site
// router.post('/', requireAuth, validateCreateSite, asyncHandler(async (req,res) => {
//     const { userId, address, city, state, country, name, price, description, images } = req.body
//     const newSite = await Site.build({
//         userId,
//         address, 
//         city, 
//         state, 
//         country, 
//         name, 
//         price, 
//         description,
//         images
//     })
//     await newSite.save()


//     if(newSite){
//         return res.json(newSite)
//     }        
// }))
// router.get('/images/:key', (res, req) => {
//     const key = req.params.key
//     const readStream = getFileStream(key)

//     readStream.pipe(res)
// })


router.post('/', validateCreateSite, requireAuth, asyncHandler(async (req,res) => {
    const { userId, address, city, state, country, name, price, description, images } = req.body
    const newSite = await Site.build({
        userId,
        address, 
        city, 
        state, 
        country, 
        name, 
        price, 
        description,
        images
    })
    await newSite.save()

    if(newSite){
        return res.json(newSite)
    }        
}))


//get site details 
router.get('/:id', asyncHandler(async (req,res) => {
    const siteId = req.params.id;    
    const site = await Site.findByPk(siteId);
    return res.json({
        site
    })
}))


//edit a site
router.patch('/:id', requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const { userId, address, city, state, country, name, price, description, images} = req.body
    const site = await Site.findByPk(id)
    await site.update({
        userId,
        address,
        city,
        state,
        country,
        price,
        name,
        description,
        images
    })
   
    return res.json(site)
}))

//delete a site route
router.delete('/:id', requireAuth, asyncHandler(async (req,res) => {
    const site = await Site.findByPk(req.params.id)

    await site.destroy()
    
    return res.json(site)
}))

//get all reviews
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


//post a review
router.post('/:id/review', requireAuth, validatePostReview, asyncHandler(async(req,res) => {
    // const site = await Site.findByPk(req.params.id)
    
    const { userId, review, rating, siteId } = req.body;
    const newReview = await Review.create({
        userId,
        siteId,
        review,
        rating
    })

    res.redirect(`${req.baseUrl}/${siteId}`)
}))

//get the review to be edited
// router.get('/review/:id/edit', asyncHandler(async(req,res)=> {
//     const id = parseInt(req.params.id, 10);
//     console.log(id)
//     const review = await Review.findByPk(id)
//     return res.json(review)
// }))

//edit a review
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

//delete a review
router.delete('/review/:id', requireAuth, asyncHandler(async (req,res) => {
    const review = await Review.findByPk(req.params.id)

    await review.destroy()
    return res.json(review)
}))


module.exports = router