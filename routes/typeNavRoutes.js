const express = require('express');
const typeNavController = require('../controllers/typeNavController');

const router = express.Router();

router.route('/').get(typeNavController.getAllTypes);

module.exports = router;
