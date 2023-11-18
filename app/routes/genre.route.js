const express = require('express')
const router = express.Router()
const controller = require('../controllers/genre.controller');

router.get('/',controller.getAll)
router.post("/new", controller.create)
router.delete('/delete/:id', controller.deleteOne);
router.patch('/update/:id', controller.updateOne);

module.exports = router