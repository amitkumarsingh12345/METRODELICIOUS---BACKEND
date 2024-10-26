const router = require('express').Router();

const { addHotal, getHotal, hotalSearch, hotalDelete, hotalUpdate } = require('../controler/hotal');

//-----------------------CATEGORY ROUTER---------------------------

router.post('/hotal/create', addHotal);
router.get('/hotal/find', getHotal);
router.get('/hotal/search/:id', hotalSearch);
router.delete('/hotal/delete/:id', hotalDelete);
router.put('/hotal/update/:id', hotalUpdate);

module.exports = router;