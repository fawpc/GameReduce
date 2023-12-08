const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

router.post('/coin', coinController.obterNumeroDeMoedas);

module.exports = router;