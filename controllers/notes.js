
// imports
const { request, response } = require( 'express' );
const Note = require( '../models/Note' );


// getNotes
const getNotes = async( req = request, res = response ) => {

    const notes = await Note.find({ user: req.user.id }).lean();
    res.render( 'notes', {
        title: 'Tareas',
        notes
    });

};


// getAddNote
const getAddNote = ( req = request, res = response ) => {

    res.render( 'addNote', {
        title: 'Añadir tarea'
    });

};


// postAddNote
const postAddNote = async( req = request, res = response ) => {

    const { title, description } = req.body;
    if ( !title || !description ) {
        req.flash( 'error', 'Creo te falto añadir informacion de la nota !' )
        res.redirect( '/addNote' );
        return;
    };
    const nota = new Note({ title, description });
    nota.user = req.user.id;
    await nota.save();
    req.flash( 'succes_msg', 'Nota añadida correctamente :uwus:' )
    res.redirect( '/notes' );

};


// getEditNote
const getEditNote = async( req = request, res = response ) => {

    const note = await Note.findById( req.params.id ).lean();
    if ( note.user != req.user.id ) {
        req.flash( 'error', 'Ooops esa nota no la puedes editar crack !' )
        res.redirect( '/notes' );
    };
    res.render( 'editNote', {
        title: 'Editar tarea',
        note
    });

};


// putEditNote
const putEditNote = async( req = request, res = response ) => {

    const id = req.params.id;
    const { title, description } = req.body;
    if ( !title || !description ) {
        req.flash( 'error', 'Ooops !! algo a fallado en la edicion de la nota' )
        res.redirect( '/notes' );
        return;
    };
    await Note.findByIdAndUpdate( id, ({ title, description }) );
    req.flash( 'succes_msg', 'Nota editada correctamente :uwus:' );
    res.redirect( '/notes' )

};


// deleteDeleteNote
const deleteDeleteNote = async( req = request, res = response ) => {

    const note = await Note.findById( req.params.id );
    if ( note.user != req.user.id ) {
        req.flash( 'error', 'Ooops esa nota no la puedes borrar crack !' )
        res.redirect( '/notes' );
    };
    await Note.findByIdAndDelete( req.params.id )
    req.flash( 'succes_msg', 'Waaa una nota ha sido borrada' );
    res.redirect( '/notes' );

};


// exprots
module.exports = {
    getNotes,
    getAddNote,
    postAddNote,
    getEditNote,
    putEditNote,
    deleteDeleteNote
};