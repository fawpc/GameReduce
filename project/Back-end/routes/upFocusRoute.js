const express = require('express');
const router = express.Router();
const upfController = require('../controllers/upfController');

router.put('/upfocus', upfController.Upfocus);

module.exports = router;