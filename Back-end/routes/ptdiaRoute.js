const express = require('express');
const router = express.Router();
const ptdiaController = require('../controllers/ptdiaController');

router.post('/ptdia', ptdiaController.Userptdia); 

module.exports = router;