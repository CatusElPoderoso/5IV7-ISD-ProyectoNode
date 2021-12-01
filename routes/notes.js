
// imports
const {Router} = require('express');
const {getNotes,
        getAddNote,
        postAddNote,
        getEditNote,
        putEditNote,
        deleteDeleteNote} = require('../controllers/notes');
const auth = require('../helpers/auth');



// router
const router = Router();


// get /notes
router.get('/notes', auth, getNotes);


// get /addNote
router.get('/addNote', auth, getAddNote);


// post /addNote
router.post('/addNote', auth, postAddNote);


// get /editNote
router.get('/editNote/:id', auth, getEditNote);


// put /editNote
router.put('/editNote/:id', auth, putEditNote);


// delete /deleteNote
router.delete('/deleteNote/:id', auth, deleteDeleteNote);


// exports
module.exports = router;