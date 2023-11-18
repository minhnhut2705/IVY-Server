const express = require('express')
const router = express.Router()
const controller = require('../controllers/song.controller');

router.get('/',controller.getAll)
router.get('/:id', controller.getSong)
router.post("/", controller.getTopSongs)
router.post("/searchSongs", controller.searchSongs)
router.post("/getFavorites", controller.getFavorites)
router.post("/getRecentlyPlayed", controller.getRecentlyPlayed)
router.post("/new", controller.create)
router.delete('/delete/:id', controller.deleteOne);
router.patch('/update/:id', controller.updateOne);
router.post('/update/:id/stream', controller.updateSongStream);

module.exports = router