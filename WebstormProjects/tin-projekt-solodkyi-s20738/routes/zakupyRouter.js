const express = require('express');
const router = express.Router();
const zakupyController = require('../controllers/ZakupyControler');
router.get('/',zakupyController.showZakupyList);
router.get('/add',zakupyController.showAddZakupyForm);
router.get('/details/:zakupyId',zakupyController.showZakupyDetails);
router.get('/edit/:zakupyId',zakupyController.showEditZakupyFrom);
router.post('/add',zakupyController.addZakupy);
router.post('/edit',zakupyController.updateZakupy);
router.get('/delete/:zakupyId',zakupyController.deleteZakupy);
module.exports =router;

