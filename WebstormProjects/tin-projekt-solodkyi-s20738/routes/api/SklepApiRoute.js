const express = require('express');
const router = express.Router();
const SklepApiController = require('../../api/SklepAPI');
router.get('/',SklepApiController.getSklep);
router.get('/:sklepId',SklepApiController.getSklepById);
router.post('/',SklepApiController.createSklep);
router.put('/:sklepId',SklepApiController.updateSklep);
router.delete('/:sklepId',SklepApiController.deleteSklep);

