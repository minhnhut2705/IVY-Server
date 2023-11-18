const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller');

router.get("/", controller.getAll);
router.post("/getUserData", controller.getUserData);
router.post("/register", controller.registerNewUser);
router.post("/login", controller.loginUser);
router.delete("/delete/:id", controller.deleteOne);
router.post("/fakelogin", controller.fakeLoginUser);
router.post("/checkExistEmail", controller.checkExistEmail);

router.patch("/updateFavorites/:id", controller.updateFavorites);
router.patch("/updatePlaylists/:id", controller.updatePlaylists);
router.patch("/updateSongs/:id", controller.updateSongs);
router.patch("/updateRecentlyPlayed/:id", controller.updateRecentlyPlayed);
router.patch("/updateUserInfo/:id", controller.updateUserInfo);
router.patch("/updateUserInfoPassword/:id", controller.updateUserInfoPassword);
router.patch("/updateUserAvatar/:id", controller.updateUserAvatar);


module.exports = router


