const AWS = require('aws-sdk');

module.exports = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_SECRET,
  region: 'eu-central-1'
});
