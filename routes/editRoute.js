const express = require('express');
const router = express.Router();
const editController = require('../controllers/editController');

router.put('/edit', editController.editUser);

module.exports = router;