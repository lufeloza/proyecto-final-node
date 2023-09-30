const { getAll, create, remove } = require('../controllers/imagen.controllers');
const express = require('express');
const upload = require('../utils/multer');

const imagenRouter = express.Router();

imagenRouter.route('/')
    .get(getAll)
    .post(upload.single('image'), create)
imagenRouter.route('/:id')
	.delete(remove)

module.exports = imagenRouter;