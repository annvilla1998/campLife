// const fs = require('fs')
const AWS = require('aws-sdk')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' })

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
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const S3_BUCKET = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_BUCKET_REGION;


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET},
//     region: REGION,
// })


const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
      Bucket: S3_BUCKET,
      Key,
      Body: buffer,
      ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();
  
    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Location;
  };


const multiplePublicFileUpload = async (files) => {
    return await Promise.all(
      files.map((file) => {
        return singlePublicFileUpload(file);
      })
    );
  };


const singlePrivateFileUpload = async (file) => {
const { originalname, mimetype, buffer } = await file;
const path = require("path");
// name of the file in your S3 bucket will be the date in ms plus the extension name
const Key = new Date().getTime().toString() + path.extname(originalname);
const uploadParams = {
    Bucket: S3_BUCKET,
    Key,
    Body: buffer,
};
const result = await s3.upload(uploadParams).promise();

// save the name of the file in your bucket as the key in your database to retrieve for later
return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
return await Promise.all(
    files.map((file) => {
    return singlePrivateFileUpload(file);
    })
);
};


const retrievePrivateFile = (key) => {
    let fileUrl;
    if (key) {
      fileUrl = s3.getSignedUrl("getObject", {
        Bucket: S3_BUCKET,
        Key: key,
      });
    }
    return fileUrl || key;
  };


const storage = multer.memoryStorage({
destination: function (req, file, callback) {
    callback(null, "");
},
});

const singleMulterUpload = (nameOfKey) =>
multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
multer({ storage: storage }).array(nameOfKey);

// const uploadFile = (file) => {

// const params = {
//     ACL: 'public-read',
//     Body: file,
//     Bucket: S3_BUCKET,
//     Key: file.name
// };

// myBucket.putObject(params)
//     // .on('httpUploadProgress', (evt) => {
//     //     setProgress(Math.round((evt.loaded / evt.total) * 100))
//     // })
//     // .send((err) => {
//     //     if (err) console.log(err)
//     // })

// }

// module.exports = { uploadFile }

module.exports = {
    s3,
    singlePublicFileUpload,
    multiplePublicFileUpload,
    singlePrivateFileUpload,
    multiplePrivateFileUpload,
    retrievePrivateFile,
    singleMulterUpload,
    multipleMulterUpload,
  };
