const path = require('path');
const { createWriteStream } = require('fs');

const webp = require('webp-converter');
webp.grant_permission();

const uploadPicture = async (picture, id, folder) => {
  const { createReadStream, filename } = await picture;
  const pictureName = id + '.' + filename.split('.').slice(-1);

  await new Promise((res) =>
    createReadStream()
      .pipe(
        createWriteStream(
          path.join(__dirname, folder, pictureName)
        )
      )
      .on('close', res)
  );

  await webp.cwebp(path.join(__dirname, folder, pictureName),
    path.join(__dirname, folder, id + '.webp'), '-q 50 -quiet');

  return pictureName;
};

module.exports.uploadProfilePicture = async (picture, id) => await uploadPicture(picture, id, '../public/profile_pictures');
module.exports.uploadRoutePicture = async (picture, id) => await uploadPicture(picture, id, '../public/route_pictures');
