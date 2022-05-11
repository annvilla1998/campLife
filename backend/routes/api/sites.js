const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Site, Review, Trip } = require('../../db/models');
const router = express.Router();
const AWS = require('aws-sdk');
const keys = require('../../utils/keys.js')

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


// //AWS
// // configuring the DiscStorage engine.
// const storage = multer.diskStorage({
//     destination : 'uploads/',
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
//   const upload = multer({ storage: storage });
  
// //setting the credentials
// AWS.config.update({
// accessKeyId: keys.iam_access_id,
// secretAccessKey: keys.iam_secret,
// region: 'us-west-1',
// });


// //Creating a new instance of S3:
// const s3= new AWS.S3();

// //The uploadFile function
// function uploadFile(source,targetName,res){
//     console.log('preparing to upload...');
//     fs.readFile(source, function (err, filedata) {
//       if (!err) {
//         const putParams = {
//             Bucket      : 'sample-bucket-name',
//             Key         : targetName,
//             Body        : filedata
//         };
//         s3.putObject(putParams, function(err, data){
//           if (err) {
//             console.log('Could nor upload the file. Error :',err);
//             return res.send({success:false});
//           } 
//           else{
//             fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
//             console.log('Successfully uploaded the file');
//             return res.send({success:true});
//           }
//         });
//       }
//       else{
//         console.log({'err':err});
//       }
//     });
//   }

// //The retrieveFile function
// function retrieveFile(filename,res){

//     const getParams = {
//       Bucket: 'sample-bucket-name',
//       Key: filename
//     };
  
//     s3.getObject(getParams, function(err, data) {
//       if (err){
//         return res.status(400).send({success:false,err:err});
//       }
//       else{
//         return res.send(data.Body);
//       }
//     });
//   }

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

router.post('/', requireAuth, validateCreateSite, asyncHandler(async (req,res) => {

    uploadFile(req.file.path, req.file.filename ,res);
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