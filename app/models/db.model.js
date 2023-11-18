const config = require("../config/index")
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db={}

db.mongoose = mongoose;
db.url = config.db.uri
db.secret = "secret"

module.exports = db;
