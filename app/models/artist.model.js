const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://firebasestorage.googleapis.com/v0/b/athena-4d002.appspot.com/o/img%2Fusers%2FDefaultUser.png?alt=media&token=c716f841-2785-4410-94cb-0b33a9f105f6"
    },
    instagram: {
      type: String,
      required: false,
      default: 'https://www.instagram.com/'
    },
    songs: {
      type: Array,
      default: []
    }
  },
  { timestamps: true },
  { collection: "artists" }
);
module.exports = mongoose.model("artists", artistSchema);
