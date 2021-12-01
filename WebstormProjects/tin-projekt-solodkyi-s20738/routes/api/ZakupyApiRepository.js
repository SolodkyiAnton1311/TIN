const express = require('express');
const router = express.Router();
const ZakupyApiController = require('../../api/ZakupyAPI');
router.get('/',ZakupyApiController.getZakupy);
router.get('/:zakupyId',ZakupyApiController.getZakupyById);
router.post('/',ZakupyApiController.createZakupy);
router.put('/:zakupyId',ZakupyApiController.updateZakupy);
router.delete('/:zakupyId',ZakupyApiController.deleteZakupy);
module.exports = router;
