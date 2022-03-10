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


//get site details
router.get('/:id', asyncHandler(async (req,res) => {
    const siteId = req.params.id;
    const images = await Image.findAll({
        where:{
            siteId: siteId
        }
    })
    const site = await Site.findByPk(siteId);
    return res.json({
        site, 
        images
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
    // delete req.body.id;
    // await Site.update(req.body, {
    //     where: { id },
    //     returning: true
    // })
    // const site = await Site.findByPk(id)
    return res.json(site)
}))

//delete a site route
router.delete('/:id', requireAuth, asyncHandler(async (req,res) => {
    const site = await Site.findByPk(req.params.id)

    await site.destroy()
    
    return res.json(site)
}))

//get all reviews
router.get('/:id/reviews', asyncHandler(async(req,res) => {
    const reviews = await Review.findAll()

    return res.json(reviews)
}))

//post a review
router.post('/:id/reviews', requireAuth, asyncHandler(async(req,res) => {
    const site = await Site.findByPk(req.params.id)
    
    const { userId, siteId, review, rating } = req.body;
    const newReview = await Review.create({
        userId,
        siteId,
        review,
        rating
    })
    res.redirect(`${req.baseUrl}/${site.id}`)
}))

//edit a review

//delete a review


module.exports = router