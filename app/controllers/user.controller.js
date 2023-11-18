const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({
        success: false,
        msg: 'Cant find all users',
      });
    }
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.registerNewUser = async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password:  await bcrypt.hash(req.body.password, 8),
      avatar: req.body.avatar,
      role: req.body.role,
      favorites: req.body.favorites,
      songs: req.body.songs,
      playlists: req.body.playlists,
      DoB: req.body.DoB,
      country: req.body.country,
      recentlyPlayed: req.body.recentlyPlayed,
      artistId: req.body.artistId
    });
    const userExist = await User.findOne({ "email": req.body.email })
    let data = null
    let token = null
    if (!userExist) {
      data = await user.save()
      token = await user.generateAuthToken()
      return res.status(201).json({ success: true, token: token })
    } else {
      return res.status(203).json({ success: false, error: "Email existed", errorCode: "alreadyRegister" })
    }
  } catch (error) {
    res.status(401).json({ success: false, error: "Something went wrong!!" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "User not exists" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, error: "Password not match" });
    }
    const token = await user.generateAuthToken();
    return res.status(201).json({ success: true, token: token });
  } catch (error) {
    return res.status(401).json({ success: false, error: error });
  }
};

exports.fakeLoginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, msg: "User not exists" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, msg: "Password not match" });
    }
    return res.status(201).json({ success: true, msg: "Getted" });
  } catch (error) {
    return res.status(401).json({ success: false, msg: error });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const token = req.body.jwt
    const decoded = jwt.verify(token, "secret");
    const id = decoded._id
    const user = await User.findById(id)
    return res.status(201).json({ 
      success: true, 
      user: user 
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error
    });
  }
};
exports.updateFavorites = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const updateFavorites = {
    favorites: req.body.favorites,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, updateFavorites, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
exports.updatePlaylists = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const updatePlaylists = {
    playlists: req.body.playlists,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, updatePlaylists, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
exports.updateSongs = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const updateSongs = {
    songs: req.body.songs,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, updateSongs, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
exports.updateRecentlyPlayed = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const songsPlayed = {
    recentlyPlayed: req.body.recentlyPlayed,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, songsPlayed, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
exports.updateUserInfo = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const unpdateUserInfo = {
    userName: req.body.userName,
    DoB: req.body.DoB,
    country: req.body.country,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, unpdateUserInfo, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
exports.updateUserAvatar = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const updateUserAvatar = {
    avatar: req.body.avatar,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, updateUserAvatar, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
exports.updateUserInfoPassword = async (req, res) => {
  const userId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const updateUserInfoPassword = {
    userName: req.body.userName,
    email: req.body.email,
    password:  await bcrypt.hash(req.body.password, 8),
    DoB: req.body.DoB,
    country: req.body.country,
  }
  try {
    const user = await User.findByIdAndUpdate(userId, updateUserInfoPassword, option)
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};

exports.deleteOne = async (req, res) => {
  const userId = req.params.id
  const filter = { _id: userId }

  const user = await User.deleteOne(filter)
  if (user) {
    return res.status(200).json({ 
      success: true, 
      user: user })
  } else {
    return res.status(400).json({ 
      success: false, 
      msg: "Not match any user" })
  }
};

exports.checkExistEmail = async (req, res) => {
  try {
    const userExist = await User.findOne({ "email": req.body.email })
    if (userExist) {
      return res.status(201).json({ success: true })
    } else {
      return res.status(203).json({ success: false, errorCode: "nonExist" })
    }
  } catch (error) {
    res.status(401).json({ success: false, errorCode: "Wrong" });
  }
};
