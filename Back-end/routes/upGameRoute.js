const express = require('express');
const router = express.Router();
const upgController = require('../controllers/upgController');

router.put('/upgame', upgController.Upgame);

module.exports = router;