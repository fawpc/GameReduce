const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.post('/stats', statsController.Userstats); 

module.exports = router;