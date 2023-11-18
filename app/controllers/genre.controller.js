const Genre = require("../models/genre.model")

exports.getAll = async (req, res, next) => {
  try {
    const genres = await Genre.find({});
    if (!genres) {
      return res.status(400).json({
        success: false,
        msg: "Cant find any Genre in database",
      });
    }
    return res.status(200).json({
      success: true,
      genres: genres,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

exports.create = async (req, res, next) => {
  const newGenre = await new Genre({
    name: req.body.name,
    songs: req.body.songs
  });
  const sameName = await Genre.find({ name: req.body.name });
  if (sameName.length > 0) {
    return res.status(400).json({
      message: "Genre already exists, please choose another name !",
    });
  }
  try {
    const savedGenre = await newGenre.save()
    return res.status(200).send({ success: true, genre: savedGenre })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
};

// exports.getOne = async (req, res, next) => {
//   try {
//     const genre = await Genre.findById(req.params.id);
//     if (!genre) {
//       return res.status(400).json({
//         success: false,
//         msg: "Cant find any Genre in database",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       genre: genre,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       error: error,
//     });
//   }
// };

exports.deleteOne = async (req, res, next) => {
  const genreId = req.params.id
  const filter = { _id: genreId }

  const genre = await Genre.deleteOne(filter)
  if (genre) {
    return res.status(200).json({ success: true, msg: "Song was deleted successfully", genre: genre })
  } else {
    return res.status(400).json({ success: false, msg: "Not match any song" })

  }
};

exports.updateOne = async (req, res, next) => {
  const genreId = req.params.id
  const option = {
    upsert: true,
    new: true
  }
  const unpdateInfoGenre = {
    name: req.body.name,
    songs: req.body.songs
  }
  try {
    const genre = await Genre.findByIdAndUpdate(genreId, unpdateInfoGenre, option)
    return res.status(200).json({ success: true, genre: genre })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
};
