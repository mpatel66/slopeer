import path from 'path';
import fs from 'fs';
import s3 from './uploader';
import { Document } from 'mongoose';
import webp from 'webp-converter';
// const webp = require('webp-converter');
import { S3 } from 'aws-sdk';
webp.grant_permission();

//picture is a string
// id is either the route id or the profile id depending on the use case
// folder is a string

const Bucket = process.env.BUCKET as string;

const uploadPicture = async (picture: any, id: Document['_id'], folder: string) => {
  const { createReadStream, filename } = await picture;
  const pictureName = id + '.' + filename.split('.').slice(-1);

  const local_path = path.join(__dirname, '../images/' + folder);

  await new Promise((res) =>
    createReadStream()
      .pipe(fs.createWriteStream(local_path + pictureName))
      .on('close', res));

  const webp_path = path.join(__dirname, '../images/' + folder, id + '.webp');
  await webp.cwebp(local_path + pictureName, webp_path, '-q 50 -quiet');

  const params: S3.PutObjectRequest = {
    Bucket: Bucket,
    Key: folder + pictureName,
    Body: fs.createReadStream(local_path + pictureName),
    ACL: 'public-read'
  };
  await s3.upload(params).promise();

  params.Key = folder + id + '.webp';
  params.Body = fs.createReadStream(webp_path);
  await s3.upload(params).promise();

  return pictureName;
};

export const uploadProfilePicture = async (picture:any, id: Document['_id']):Promise<string> => await uploadPicture(picture, id, 'profile_pictures/');

export const uploadRoutePicture = async (picture:any, id: Document['_id']): Promise<string> => await uploadPicture(picture, id, 'route_pictures/');

