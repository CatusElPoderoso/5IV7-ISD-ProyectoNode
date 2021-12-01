
// imports
const { request, response } = require( 'express' );


// getHome
const getHome = ( req = request, res = response ) => {

    res.render( 'home', {
        title: 'TaskX',
        gif: true
    });

};


// getOther
const getOther = ( req = request, res = response ) => {

    res.render( 'home', {
        title: 'TaskX',
        gif: true
    });

};


// exprots
module.exports = {
    getHome,
    getOther
};