const express = require('express');
const router = express.Router();
const allStyleController = require('../controllers/allStylesController');

router.get('/allstyles', allStyleController.AllStyles);

module.exports = router;