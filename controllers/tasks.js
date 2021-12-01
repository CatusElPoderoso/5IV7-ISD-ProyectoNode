// imports
const {request, response} = require('express');
const Note = require('../models/tareas');

// usamos la configuración y estructura para las notas importadas
// desde models/notas.js

const getTask = async(req = request, res = response) => {

    // entonces leemos las notas guardadas en la base de datos que 
    // coincidan o "estén a nombre de" el ID del usuario que está 
    // haciendo el request

    const notes = await Note.find({user: req.user.id}).lean();
    // tomamos el objeto de notas
    res.render('notes', {
        title: 'Tareas',
        notes
   });
};

// en caso de que el usuario quiera agregar una nota a la base de datos
const addTask = (req = request, res = response) => {
    // para añadir una nota usamos addNote
    res.render('addNote', {
        title: 'Añadir tarea'
   });
};

// después de que el usuario haya añadido la nota
const postAddTask = async(req = request, res = response) => {

    // entonces se te pide una descripción para la nota o tarea que 
    // hayas agregado a la base de datos que coincida con tu ID  

    const {title, description} = req.body;
    if (!title || !description) {

        /** 
         * En caso de que el contenido de la nota o tarea no tengan  
         * ni título ni contenido, entonces el programa te manda error y
         * no te deja guardar dicha nota
         */

        req.flash('error', 'No puedes guardar una tarea sin contenido')
        res.redirect('/addNote'); // y nos redirecciona a agregar nota
        return;
   };
    const nota = new Note({title, description});
    nota.user = req.user.id;
    await nota.save();

    /**
     * cuando agregar otra nota a la base  
     * se manda un comentario de "success" 
     * donde se notifica al usuario que su nota  
     * fue correctamente añadida
     */

    req.flash('success_msg', 'Tarea nueva añadida')
    res.redirect('/notes');

};

// editTask
const editTask = async(req = request, res = response) => {

    /**
     * Este apartado es para cuando la nota, por cualquier  
     * razón, no puede ser editada.
     * 
     * En ese caso el programa mandará el mensaje de error y no permitirá
     * alterar el contenido de la nota.
     */

    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash('error', 'Esta nota no puede editarse') // manda el mensaje de error 
        res.redirect('/notes'); // y nos redirecciona a ver nuestras notas
    };
    res.render('editNote', {
        title: 'Editar tarea',
        note
    });
};

// msgEditTask
const msgEditTask = async(req = request, res = response) => {

    /** 
     * Este es el mensaje que sale cuando el error al editar la nota 
     * es mientras o después se está editando la nota
     */

    const id = req.params.id;
    const {title, description} = req.body;
    if (!title || !description) {
        req.flash('error', 'Algo ha fallado y no puedes editar esta nota') // error de que hubo un fallo
        res.redirect('/notes'); // y nos redirecciona a ver nuestras notas
        return;
   };
    await Note.findByIdAndUpdate(id, ({title, description}));
    req.flash('success_msg', `Editaste correctamente la nota: ${title}`); // mensaje de que la nota fue correctamente editada
    res.redirect('/notes') // y nos redirecciona a el espacio de nuestras notas
};

// deleteTask
const deleteTask = async(req = request, res = response) => { // el método para borrar las notas
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {

        /** 
         * Para cuando queremos eliminar una nota, la base nos pide la id  
         * del usuario y la nota que quiera borrar
         */    

        req.flash('error', 'No puedes borrar esta nota')
        res.redirect('/notes');
    };
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Nota borrada correctamente'); // mensaje para cuando la nota fue correctamente borrada
    res.redirect('/notes');
};

// exports
module.exports = {
    getTask, // visualiza las tareas
    addTask, // agrega tarea
    postAddTask, // posteriormente a agregar la tarea
    editTask, // editar la tarea
    msgEditTask, // mensaje después de editar la tarea
    deleteTask // borrar la tarea
};