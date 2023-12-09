const express = require('express');
const router = express.Router();
const createController = require('../controllers/createController');

router.post('/create', createController.createUser);

module.exports = router;