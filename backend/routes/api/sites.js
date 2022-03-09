const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Site, Image } = require('../../db/models');

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
    const { address, city, state, country, name, price, description, url } = req.body
    const newImage = await Image.create({
        url,
        siteId: +req.params.id
    })
    const newSite = await Site.create({
        address, 
        city, 
        state, 
        country, 
        name, 
        price, 
        description
    })
    
    return res.redirect(`${req.baseUrl}/${newSite.id}`)
}))


//get site details
router.get('/:id', asyncHandler(async (req,res) => {
    const siteId = +req.params.id;
    const site = await Site.findByPk(siteId);
    return res.json(site)
}))


//edit a site
// router.patch('/:id', requireAuth,asyncHandler(async (req,res) => {
//     const siteId = req.params.id
// }))

module.exports = router