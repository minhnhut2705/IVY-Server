const Song = require("../models/song.model")
const Artist = require("../models/artist.model")

exports.getAll = async (req, res, next) => {
  try {
    const songs = await Song.find({}).sort({stream: -1})
    if (!songs) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any songs in database",
      });
    }
    return res.status(200).json({
      success: true,
      songs: songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};
exports.searchSongs = async (req, res, next) => {
  const songIDs = req.body.songIDs
  try {
    const songs = await Song.find({ '_id': { $in: songIDs } })
    if (!songs) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any songs in database",
      });
    }
    return res.status(200).json({
      success: true,
      songs: songs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};
exports.getSong = async (req, res, next) => {
  const songId = req.params.id
  try {
    const song = await Song.findById(songId)
    if (!song) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any song in database",
      });
    }

    const artistName = await Artist.findById(song.artist[0])
    return res.status(200).json({
      success: true,
      song: { ...song, artistName: artistName },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};
exports.getTopSongs = async (req, res, next) => {
  const numOfSong = req.body.numOfSong
  try {
    const songs = await Song.find({}).sort({ stream: -1 })
    if (!songs) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any songs in database",
      });
    }
    return res.status(200).json({
      success: true,
      songs: songs.splice(0, numOfSong),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};
exports.getFavorites = async (req, res, next) => {
  const favoriteSongsId = req.body.favoriteSongsId
  try {
    const songs = await Song.find({}).sort({ stream: -1 })
    if (!songs) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any songs in database",
      });
    }
    const favoriteSongs = favoriteSongsId.map((songId) => songs.find(song => song._id == songId))
    return res.status(200).json({
      success: true,
      songs: favoriteSongs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};
exports.getRecentlyPlayed = async (req, res, next) => {
  const recentlyPlayedSongsId = req.body.recentlyPlayed
  try {
    const songs = await Song.find({}).sort({ stream: -1 })
    if (!songs) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any songs in database",
      });
    }
    const recentlyPlayedSongs = recentlyPlayedSongsId.map((songId) => songs.find(song => song._id == songId))
    return res.status(200).json({
      success: true,
      songs: recentlyPlayedSongs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.create = async (req, res, next) => {
  const newSong = new Song({
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    songURL: req.body.songURL,
    artist: req.body.artist,
    banner: req.body.banner,
    stream: req.body.stream,
    genres: req.body.genres,
    type: req.body.type

  });
  // const sameName = await Song.find({ name: req.body.name });
  // if (sameName.length > 0) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Your song name already exists, please choose another name !",
  //   });
  // }
  try {
    const savedSong = await newSong.save()
    return res.status(200).json({ 
      success: true, 
      song: savedSong 
    })
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      msg: error })
  }
};

// exports.getOne = async (req, res, next) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(400).json({
//         success: false,
//         msg: "Cant find any playlist in database",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       song: song,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       error: error,
//     });
//   }
// };

exports.deleteOne = async (req, res, next) => {
  const songId = req.params.id
  const filter = { _id: songId }

  const data = await Song.deleteOne(filter)
  if (data) {
    return res.status(201).json({ success: true, result: data, msg: "Song was deleted successfully" })
  } else {
    return res.status(401).json({ success: false, msg: "Not match any song" })

  }
};

exports.updateOne = async (req, res, next) => {
  const songId = req.params.id
  const option = {
    upsert: true,
    new: true
  }

  const unpdateInfoSong = {
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    songURL: req.body.songURL,
    artist: req.body.artist,
    banner: req.body.banner,
    stream: req.body.stream,
    genres: req.body.genres,
    type: req.body.type
  }
  try {
    const data = await Song.findByIdAndUpdate(songId, unpdateInfoSong, option)
    return res.status(200).json({ success: true, result: data })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
};

exports.updateSongStream = async (req, res) => {
  const songsId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const unpdateInfoSong = {
    name: req.body.song.name,
    thumbnail: req.body.song.thumbnail,
    songURL: req.body.song.songURL,
    artist: req.body.song.artist,
    banner: req.body.song.banner,
    stream: req.body.song.stream,
    genres: req.body.song.genres,
    type: req.body.song.type
  }
  try {
    const song = await Song.findByIdAndUpdate(songsId, unpdateInfoSong, option)
    return res.status(200).json({ success: true, song: song })
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
};
