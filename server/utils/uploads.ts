import path from 'path';
import fs from 'fs';
import s3 from './uploader';
import { Document } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webp = require('webp-converter');
import { S3 } from 'aws-sdk';
import { FileUpload } from 'graphql-upload';
webp.grant_permission();

const Bucket = process.env.BUCKET as string;

const uploadPicture = async (picture: FileUpload, id: Document['_id'], folder: string) => {
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

export const uploadProfilePicture = async (picture: FileUpload, id: Document['_id']):Promise<string> => await uploadPicture(picture, id, 'profile_pictures/');

export const uploadRoutePicture = async (picture: FileUpload, id: Document['_id']): Promise<string> => await uploadPicture(picture, id, 'route_pictures/');

