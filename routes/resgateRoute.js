const express = require('express');
const router = express.Router();
const resgateController = require('../controllers/resgateController');

router.post('/resg', resgateController.resgate); 

module.exports = router;