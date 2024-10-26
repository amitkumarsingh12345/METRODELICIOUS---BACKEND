const router = require('express').Router();
const {
    createUserAcount,
    getUser
} = require('../controler/user');

//-----------------------USER ROUTER---------------------------

router.post('/user/create', createUserAcount);
router.get('/user/find', getUser);

module.exports = router;