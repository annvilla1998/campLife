const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { models } = require('../../db/models');
const router = express.Router();

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


// View all sites
router.get('/', asyncHandler(async (req, res) => {
    const sites = await models.Site.findAll();
    return res.json({
        sites
    })
}))

// Post a new site
router.post('/', validateCreateSite, requireAuth, asyncHandler(async (req,res) => {
    const { userId, address, city, state, country, name, price, description, image1, image2, image3, image4 } = req.body
    const newSite = await models.Site.build({
        userId,
        address, 
        city, 
        state, 
        country, 
        name, 
        price, 
        description,
        image1,
        image2,
        image3,
        image4
    })
    await newSite.save()

    if(newSite){
        return res.json(newSite)
    }        
}))


// Get site details 
router.get('/:id', asyncHandler(async (req,res) => {
    const siteId = req.params.id;    
    const site = await models.Site.findByPk(siteId);
    return res.json({
        site
    })
}))


// Edit a site
router.patch('/:id', requireAuth,asyncHandler(async (req,res) => {
    const id = req.params.id
    const { userId, address, city, state, country, name, price, description, image1, image2, image3, image4} = req.body
    const site = await models.Site.findByPk(id)
    await site.update({
        userId,
        address,
        city,
        state,
        country,
        price,
        name,
        description,
        image1,
        image2,
        image3,
        image4,
    })
   
    return res.json(site)
}))

// Delete a site route
router.delete('/:id', requireAuth, asyncHandler(async (req,res) => {
    const site = await models.Site.findByPk(req.params.id)

    await site.destroy()
    
    return res.json(site)
}))


module.exports = router;