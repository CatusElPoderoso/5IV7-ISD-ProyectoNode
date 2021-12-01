
// imports
const {request, response} = require('express');


// get Home
const getHome = (req = request, res = response) => {
    res.render('home', {
        title: 'TaskX',
        gif: true
    });
};


// get Other
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