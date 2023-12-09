const express = require('express');
const router = express.Router();
const premioController = require('../controllers/premioController');

router.post('/premios', premioController.Userpremio);

module.exports = router;