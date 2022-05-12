// const fs = require('fs')
const AWS = require('aws-sdk')

// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

// const s3 = new S3({
//     region, 
//     accessKeyId, 
//     secretAccessKey
// })

// //uploads a file to S3
// function uploadFile(file) {
//     console.log("fileeeeeeeeeeee", file)
//     const fileStream = fs.createReadSteam(file.path);
//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: file.filename
//     }

//     return s3.upload(uploadParams).promise()
// }

// exports.uploadFile = uploadFile

// //downloads a file from s3
// function getFileStream(fileKey) {
//     const downloadParams = {
//         Key: fileKey,
//         Bucket: bucketName
//     }

//     return s3.getObject(downloadParams).createReadStream()
// }

// exports.getFileStream = getFileStream

// import AWS from 'aws-sdk'

const S3_BUCKET = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_BUCKET_REGION;


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const uploadFile = (file) => {

const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name
};

myBucket.putObject(params)
    // .on('httpUploadProgress', (evt) => {
    //     setProgress(Math.round((evt.loaded / evt.total) * 100))
    // })
    // .send((err) => {
    //     if (err) console.log(err)
    // })

}

module.exports = { uploadFile }
