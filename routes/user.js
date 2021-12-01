
// imports
const { Router } = require( 'express' );
const { getLogin,
        postLogin,
        getRegister,
        postRegister,
        getLogout } = require( '../controllers/user' );


// router
const router = Router();


// get /login
router.get( '/login', getLogin );


// post /login
router.post( '/login', postLogin );


// get /register
router.get( '/register', getRegister );


// post /register
router.post( '/register', postRegister );


// get /logout
router.get( '/logout', getLogout )


// exports
module.exports = router;