const express = require('express')
const router = express.Router()
const controller = require('../controllers/artist.controller');

router.get('/',controller.getAll)
router.get('/:id', controller.getArtist)
router.post('/', controller.getTopArtists)
router.post("/new", controller.create)
router.delete('/delete/:id', controller.deleteOne);
router.patch('/update/:id', controller.updateOne);

module.exports = router


