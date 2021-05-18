/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
// dependencies
// const { hash } = require('../../helpers/utilities');
// const { parseJSON } = require('../../helpers/utilities');
const data = require('../../lib/data');

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptMethods = ['get', 'put', 'post', 'delete'];
    if (acceptMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {

};

handler._token.get = (requestProperties, callback) => {

};

handler._token.put = (requestProperties, callback) => {

};

handler._token.delete = (requestProperties, callback) => {

};
module.exports = handler;
