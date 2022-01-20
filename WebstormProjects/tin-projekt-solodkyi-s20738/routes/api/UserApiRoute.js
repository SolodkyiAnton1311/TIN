    const  isAuth = require('../../middleware/isAuth');
    const express = require("express");
    const router = express.Router();
    const userApiController = require('../../api/userApi');

    router.post('/',userApiController.createUser);
router.delete('/:userPassId',isAuth,userApiController.deleteUser)
    module.exports = router;