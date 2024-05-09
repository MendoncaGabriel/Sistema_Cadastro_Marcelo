const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageController')

router.get('/login', pageController.login);

module.exports = router;
