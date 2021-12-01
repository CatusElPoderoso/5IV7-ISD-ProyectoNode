
// imports
const {Router} = require('express');
const {getHome,
        getOther} = require('../controllers/index');


// router
const router = Router();


// get /home
router.get('/home', getHome);


// get /*
router.get('/*', getOther);


// exports
module.exports = router;