const { User } = require('../models');

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] }
  });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name, profileImage } = req.body;
  const user = await User.findByPk(req.user.id);
  if (name) user.name = name;
  if (profileImage) user.profileImage = profileImage;
  await user.save();
  res.json({ message: 'Profile updated' });
};