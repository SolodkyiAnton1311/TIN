var express = require('express');
const LangController = require('../controllers/LangController');
var router = express.Router();
const  AuthController = require("../controllers/authController")
router.post('/login',AuthController.login);
router.get('/logout',AuthController.logout);
router.get('/', function(req, res, next) {
    res.render('index', { navLocation: 'main' });
});
router.get('/changeLang/:lang', LangController.changeLang);
module.exports = router;