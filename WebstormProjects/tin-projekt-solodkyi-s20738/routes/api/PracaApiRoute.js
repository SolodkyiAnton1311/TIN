const express = require('express');
const router = express.Router();
const ZakupyApiController = require('../../api/pracaApi');
router.get('/',ZakupyApiController.getPraca);
router.get('/:pracaId',ZakupyApiController.getPracaById);
router.post('/',ZakupyApiController.createZakupy);
router.put('/:pracaId',ZakupyApiController.updateZakupy);
router.delete('/:pracaId',ZakupyApiController.deleteZakupy);
module.exports = router;
