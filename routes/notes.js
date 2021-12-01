// imports
const {Router} = require('express');
const {getTask,
        addTask,
        postAddTask,
        editTask,
        msgEditTask,
        deleteTask} = require('../controllers/tasks');
const auth = require('../helpers/auth');

// router
const router = Router();

// get /notes
router.get('/notes', auth, getTask);

// get /addNote
router.get('/addNote', auth, addTask);


// post /addNote
router.post('/addNote', auth, postAddTask);


// get /editNote
router.get('/editNote/:id', auth, editTask);


// put /editNote
router.put('/editNote/:id', auth, msgEditTask);


// delete /deleteNote
router.delete('/deleteNote/:id', auth, deleteTask);


// exports
module.exports = router;