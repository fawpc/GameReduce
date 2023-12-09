const express = require('express');
const router = express.Router();
const allGameController = require('../controllers/allGameController');

router.get('/allgame', allGameController.AllGame);

module.exports = router;