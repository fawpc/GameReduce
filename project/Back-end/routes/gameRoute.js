const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/game', gameController.Usergame);

module.exports = router;