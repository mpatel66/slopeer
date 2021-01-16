const path = require('path');
const { createWriteStream } = require('fs');

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
  return pictureName;
};

module.exports.uploadProfilePicture = async (picture, id) => await uploadPicture(picture, id, '../public/profile_pictures');
module.exports.uploadRoutePicture = async (picture, id) => await uploadPicture(picture, id, '../public/profile_pictures');
