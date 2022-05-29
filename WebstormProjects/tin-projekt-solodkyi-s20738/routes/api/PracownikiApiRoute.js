const express = require('express');
const router = express.Router();
const pracownikiApiRoute = require('../../api/pracownikApi');
router.get('/',pracownikiApiRoute.getKlients);
router.get('/:pracownikId',pracownikiApiRoute.getKlientsById);
router.post('/',pracownikiApiRoute.createKlient);
router.put('/:pracownikId',pracownikiApiRoute.updateKlient);
router.delete('/:pracownikId',pracownikiApiRoute.deleteKlient);
module.exports = router;

