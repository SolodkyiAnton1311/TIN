const express = require('express');
const router = express.Router();
const klientControler = require('../controllers/SklepControler');
router.get('/',klientControler.showKlientList);
router.get('/add',klientControler.showAddKlientForm);
router.get('/details/:sklepId',klientControler.showKlientDetails);
module.exports =router;
