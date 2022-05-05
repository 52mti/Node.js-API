const express = require('express');
const typeNavController = require('../controllers/typeNavController');

const router = express.Router();

router.route('/typeNav').get(typeNavController.getAllTypes);
