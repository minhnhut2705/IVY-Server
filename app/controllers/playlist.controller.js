const Playlist = require("../models/playlist.model");

exports.getAll = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({});
    if (!playlists) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any playlist in database",
      });
    }
    return res.status(200).json({
      success: true,
      playlists: playlists,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.create = async (req, res, next) => {
  const newPlaylist = new Playlist({
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    songs: req.body.songs,
    creator: req.body.creator,
    stream: req.body.stream
  })
  const sameName = await Playlist.find({ name: req.body.name });
  if (sameName.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Your song name already exists, please choose another name !",
    });
  }
  try {
    const savedPlaylist = await newPlaylist.save()
    return res.status(200).json({
      success: true, 
      playlist: savedPlaylist
    })
  } catch (error) {
    return res.status(400).json({
      success: false, 
      error: error
    })
  }
};


exports.getPlaylist = async (req, res, next) => {
  const playlistId = req.params.id
  const playlist = await Playlist.findById(playlistId)
  if (playlist) {
    return res.status(200).json({
      success: true,
      playlist: playlist
    })
  } else {
    return res.status(400).json({
      success: false,
      msg: "Not match any playlist"
    })

  }
};

exports.deleteOne = async (req, res, next) => {
  const playlistId = req.params.id
  const filter = { _id: playlistId }

  const playlist = await Playlist.deleteOne(filter)
  if (playlist) {
    return res.status(200).json({success: true, playlist: playlist})
  } else {
    return res.status(400).json({success: false, msg: "Not match any playlist"})
  }
};

exports.updateOne = async (req, res, next) => {
  const playlistId = req.params.id
  const filter = { _id: playlistId }
  const option = {
    upsert: true,
    new: true
  }

  const updatePlaylist = {
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    songs: req.body.songs,
    creator: req.body.creator,
    stream: req.body.stream
  }

  try {
    const playlist = await Playlist.findByIdAndUpdate(filter, updatePlaylist, option)
    if (playlist) {
      return res.status(200).json({success: true, playlist: playlist})
    } else {
      return res.status(400).json({success: false, error: error})
    }
  } catch (error) {
    return res.status(400).json({success: false, error: error})
  }
};


