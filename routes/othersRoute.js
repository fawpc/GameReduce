const express = require('express');
const router = express.Router();
const othersController = require('../controllers/othersController');

router.post('/otherspremios', othersController.Userothers);

module.exports = router;