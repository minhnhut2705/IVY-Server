const Artist = require("../models/artist.model")

exports.getAll = async (req, res, next) => {
  try {
    const artist = await Artist.find({}).sort({ 'songs': -1 })
    if (!artist) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any artist in database",
      });
    }
    return res.status(200).json({
      success: true,
      artists: artist,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};


exports.getArtist = async (req, res, next) => {
  const artistId = req.params.id
  const artist = await Artist.findById(artistId)
  if (artist) {
    return res.status(200).json({
      success: true,
      msg: "Artist was deleted successfully",
      artist: artist
    })
  } else {
    return res.status(400).json({
      success: false,
      msg: "Not match any artist"
    })

  }
};

exports.getTopArtists = async (req, res, next) => {
  const numOfArtists = req.body.numOfArtists
  try {
    const artist = await Artist.find({}).sort({ 'songs': -1 })
    if (!artist) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any artist in database",
      });
    }
    return res.status(200).json({
      success: true,
      artists: artist.splice(0, numOfArtists),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.create = async (req, res, next) => {
  const newArtist = Artist({
    name: req.body.name,
    avatar: req.body.avatar,
    instagram: req.body.instagram,
    songs: req.body.songs,
  })

  try {
    const savedArtist = await newArtist.save()
    return res.status(200).json({
      success: true,
      artist: savedArtist
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error
    })
  }
};


exports.deleteOne = async (req, res, next) => {
  const artistId = req.params.id
  const filter = { _id: artistId }

  const data = await Artist.deleteOne(filter)
  if (data) {
    return res.status(200).json({
      success: true,
      msg: "Artist was deleted successfully", reslut: data
    })
  } else {
    return res.status(400).json({
      success: false,
      msg: "Not match any artist"
    })

  }
};

exports.updateOne = async (req, res, next) => {
  const artistId = req.params.id
  const filter = { _id: artistId }
  const option = {
    upsert: true,
    new: true
  }

  const updateInfoArtist = {
    name: req.body.name,
    avatar: req.body.avatar,
    instagram: req.body.instagram,
    songs: req.body.songs,
  }

  try {
    const artist = await Artist.findByIdAndUpdate(filter, updateInfoArtist, option)
    return res.status(200).json({ success: true, artist: artist })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
};
