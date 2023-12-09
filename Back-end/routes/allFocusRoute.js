const express = require('express');
const router = express.Router();
const allFocusController = require('../controllers/allFocusController');

router.get('/allfocus', allFocusController.AllFocus);

module.exports = router;