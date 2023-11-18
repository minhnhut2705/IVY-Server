const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    songs: {
      type: Array,
      required: false,
      default: []
    }
  },
  { timestamps: true },
  { collection: "genres" }
);

module.exports = mongoose.model("genres", genreSchema);

