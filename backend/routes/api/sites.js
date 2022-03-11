const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Site, Image, Review, Trip } = require('../../db/models');


const router = express.Router();

//view all sites
router.get('/', asyncHandler(async (req, res) => {
    const sites = await Site.findAll();
    const images = await Image.findAll();
    return res.json({
        sites,
        images
    })
}))

//post a new site
router.post('/', requireAuth, asyncHandler(async (req,res) => {
    // console.log(req)
    const { userId, address, city, state, country, name, price, description, url } = req.body
    const newSite = await Site.create({
        userId,
        address, 
        city, 
        state, 
        country, 
        name, 
        price, 
        description
    })
    const newImage = await Image.create({
        url,
        siteId: newSite.id
    })
    
        
    res.redirect(`${req.baseUrl}/${newSite.id}`)
    
}))


//get site details and reviews
router.get('/:id', asyncHandler(async (req,res) => {
    const siteId = req.params.id;
    const images = await Image.findAll({
        where:{
            siteId: siteId
        }
    })
    const reviews = await Review.findAll({
        where: {
            siteId: siteId
        }
    })
    const site = await Site.findByPk(siteId);
    return res.json({
        site, 
        images,
        reviews
    })
}))


//edit a site
router.patch('/:id', requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const { userId, address, city, state, country, name, price, description, url} = req.body
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
    })

    const image = await Image.create({
        url,
        siteId: site.id
    })
   
    return res.json(site)
}))

//delete a site route
router.delete('/:id', requireAuth, asyncHandler(async (req,res) => {
    const site = await Site.findByPk(req.params.id)

    await site.destroy()
    
    return res.json(site)
}))



//post a review
router.post('/:id/review', requireAuth, asyncHandler(async(req,res) => {
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

//edit a review

//delete a review
router.delete('/reviews/:id', requireAuth, asyncHandler(async (req,res) => {
    const review = await Review.findByPk(req.params.id)
console.log(review)
    await review.destroy({
        where: {
            id: review.id
        }
    })
    
    return res.json({ id: review.id })
}))


module.exports = router