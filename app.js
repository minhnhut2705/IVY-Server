const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./app/config/index");
const db = require("./app/models/db.model");


const artistRoute = require("./app/routes/artist.route");
const songRoute = require("./app/routes/song.route");
const userRoute = require("./app/routes/user.route");
const playlistRoute = require("./app/routes/playlist.route");
const genreRoute = require("./app/routes/genre.route");

const PORT = config.app.port;
const app = express();

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/artists", artistRoute);
app.use("/api/users", userRoute);
app.use("/api/songs", songRoute);
app.use("/api/playlists", playlistRoute);
app.use("/api/genres", genreRoute);

app.use((req, res, next) => {
  console.log("Running task");
});

app.get('/', (req, res)=>{
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
