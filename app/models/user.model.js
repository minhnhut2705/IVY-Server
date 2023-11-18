const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Include your name"]
    },
    email: {
        type: String,
        required: [true, "Please Include your email"]
    },
    password: {
        type: String,
        required: [true, "Please Include your password"]
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/athena-4d002.appspot.com/o/img%2Fusers%2FDefaultUser.png?alt=media&token=c716f841-2785-4410-94cb-0b33a9f105f6"
    },
    role: {
        type: String,
        default: 'member'
    },
    favorites: {
        type: Array,
        default: []
    },
    songs: {
        type: Array,
        default: []
    },
    DoB: {
        type: Date,
    },
    country: {
        type: String,
        default: 'Việt Nam'
    },
    playlists: {
        type: Array,
        default: []
    },
    recentlyPlayed: {
        type: Array,
        default: []
    },
    artistId: {
        type: String,
        default: ''
    },
},
    { timestamps: true },
    { collection: "users" }
);

// userSchema.pre("save", async function (next) {
//     const user = this;
//     if (user.isModified("password")) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id},"secret");
    await user.save();
    return token;
};


const User = mongoose.model("User", userSchema);
module.exports = User;