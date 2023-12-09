const express = require('express');
const router = express.Router();
const resgFeitosController = require('../controllers/resgFeitosController');

router.post('/rfeitos', resgFeitosController.ResgFeitos); 

module.exports = router;