const express = require('express');
const router = express.Router();
const metasController = require('../controllers/metasController');

router.post('/metas', metasController.Usermeta);

module.exports = router;