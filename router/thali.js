const router = require('express').Router();

const { 
    addThali, 
    getThali, 
    thaliSearch, 
    thaliDelete, 
    thaliUpdate,
} = require('../controler/thali');

//-----------------------CATEGORY ROUTER---------------------------

router.post('/thali/create', addThali);
router.get('/thali/find', getThali);
router.get('/thali/search/:id', thaliSearch);
router.delete('/thali/delete/:id', thaliDelete);
router.put('/thali/update/:id', thaliUpdate);

module.exports = router;