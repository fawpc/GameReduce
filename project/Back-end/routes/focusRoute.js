const express = require('express');
const router = express.Router();
const focusController = require('../controllers/focusController');

router.post('/focus', focusController.Userfocus);

module.exports = router;