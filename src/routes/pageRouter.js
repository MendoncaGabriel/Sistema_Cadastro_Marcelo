const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

//Middlewares
const checkAuth = require('../middleware/checkAuth');

router.get('/login', pageController.login);


router.get('/', checkAuth, (req, res)=> {
    res.render("home")
});

module.exports = router;
