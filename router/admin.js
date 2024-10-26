const router = require('express').Router();
const { 
    createAdminAcount, 
    adminLogin
} = require('../controler/admin')

//-----------------------ADMIN ROUTER---------------------------

router.post('/admin/create', createAdminAcount);
router.post('/admin/login', adminLogin);

module.exports = router;
