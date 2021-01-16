const bcrypt = require('bcrypt');
const { User, Route } = require('../../models');
const { uploadProfilePicture, uploadRoutePicture } = require('../../utils/uploads');

exports.createRoute = async (_, { input }) => {
  const route = new Route({ ...input, picture: null });

  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, route._id);
    route.picture = picturePath;

  }
  await route.save();
  await User.findByIdAndUpdate(input.author, { $push: { 'owned_routes': String(route._id) } },
    { useFindAndModify: false });
  return route;
};

exports.updateRoute = async (_, { _id, input }) => {
  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, _id);
    input.picture = picturePath;
  }
  return await Route.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};

exports.removeRoute = async (_, { _id }) => {
  const route = await Route.findByIdAndDelete(_id);
  await User.findByIdAndUpdate(route.author, { $pull: { 'owned_routes': _id } }, { useFindAndModify: false });
  await User.updateMany({}, { $pull: { 'saved_routes': _id } });
  return route;
};

exports.createUser = async (_, { input: { email, username, password } }, { res }) => {
  let user = await User.findOne({ email });
  if (user) {
    res.status(409);
    return;
  }

  user = new User({ email, username, password, owned_routes: [], saved_routes: [] });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return user.generateAuthToken();
};

exports.updateUser = async (_, { _id, input }) => {
  if (input.profile_picture) {
    const picturePath = await uploadProfilePicture(input.profile_picture, _id);
    input.profile_picture = picturePath;
  }
  return await User.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};

exports.saveRoute = async (_, { userId, routeId }) =>
  await User.findByIdAndUpdate(userId, { $push: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });


exports.unsaveRoute = async (_, { userId, routeId }) =>
  await User.findByIdAndUpdate(userId, { $pull: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });

exports.login = async (_, { email, password }, { res }) => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    return;
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400);

  return user.generateAuthToken();
};
