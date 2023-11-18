const mongoose = require("mongoose");
const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      // required: true,
      default: 'https://firebasestorage.googleapis.com/v0/b/athena-4d002.appspot.com/o/img%2Fplaylists%2F1200px-Torus_7color.svg.png?alt=media&token=57dfa3e1-e0a9-4919-b08f-d669efd584df'
    },
    songs: {
      type: Array,
      required: true,
      default: []
    },
    creator: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
  { collection: "playlists" }
);

module.exports = mongoose.model("playlists", playlistSchema);
