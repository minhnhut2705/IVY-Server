const express = require('express')
const router = express.Router()
const controller = require('../controllers/playlist.controller');

router.get('/',controller.getAll)
router.get('/:id', controller.getPlaylist)
router.post("/new", controller.create)
router.delete('/delete/:id', controller.deleteOne);
router.patch('/update/:id', controller.updateOne);
router.post("/searchPlaylists", controller.searchPlaylists)

module.exports = router