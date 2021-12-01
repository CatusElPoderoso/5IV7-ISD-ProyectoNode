// imports
const {request, response} = require('express');

// cuando la página reciba 'home', entonces nos
// responde mandándonos a la página principal
const getHome = (req = request, res = response) => {
    res.render('home', {
        title: 'TaskX',
        gif: true
   });
};

// cuando la página recibe cualquier otro comando que no se  
// haya registrado, entonces igualmente va a responder
// mandando al usuario a la página de inicio
const getOther = (req = request, res = response) => {
    res.render('home', {
        title: 'TaskX',
        gif: true
   });
};

// exports
module.exports = {
    getHome,
    getOther
};