const mongoose = require("mongoose");
const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    songURL: {
      type: String,
      required: true,
    },
    artist: {
      type: Array,
      required: true,
    },
    stream: {
      type: Number,
      required: false,
      default: 0
    },
    genres: {
      type: Array,
      required: false,
      default: []
    },
    type: {
      type: String,
      default: 'member'
    }
  },
  { timestamps: true },
  { collection: "songs" }
);

module.exports = mongoose.model("songs", songSchema);
