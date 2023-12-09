const express = require('express');
const router = express.Router();
const moedasController = require('../controllers/moedasController');

router.post('/moedas', moedasController.Usermoedas); 

module.exports = router;