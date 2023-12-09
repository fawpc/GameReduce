const express = require('express');
const router = express.Router();
const mt1Controller = require('../controllers/mt1Controller');

router.post('/meta1', mt1Controller.Usermt1); 

module.exports = router;