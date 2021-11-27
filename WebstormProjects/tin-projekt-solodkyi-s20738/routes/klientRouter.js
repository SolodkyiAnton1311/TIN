const express = require('express');
const router = express.Router();
const klientControler = require('../controllers/KlientControler');
router.get('/',klientControler.showKlientList);
router.get('/add',klientControler.showAddKlientForm);
router.get('/details/:empID',klientControler.showKlientDetails);
module.exports =router;
