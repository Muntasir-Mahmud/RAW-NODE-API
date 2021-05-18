/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
// dependencies
const { createRandomString, parseJSON } = require('../../helpers/utilities');
const { hash } = require('../../helpers/utilities');
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
    const phone = typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password = typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.trim().length > 0
            ? requestProperties.body.phone
            : false;
    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            const hashPassword = hash(password);
            if (hashPassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'There was a problem in the server side!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Password is not valid',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have problem in your request',
        });
    }
};

// handler._token.get = (requestProperties, callback) => {

// };

// handler._token.put = (requestProperties, callback) => {

// };

// handler._token.delete = (requestProperties, callback) => {

// };
module.exports = handler;
