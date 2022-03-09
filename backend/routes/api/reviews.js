const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

const router = express.Router();


//get all reviews

//post a review

//edit a review

//delete a review


module.exports = router