const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/page/router');

router.get('/', pageController.home);

module.exports = router;
