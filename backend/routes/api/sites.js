const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Site, Image } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const sites = await Site.findAll();
    // const images = await Image.findAll();
    return res.json({
        sites
    })
}))


module.exports = router