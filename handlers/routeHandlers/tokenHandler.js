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

handler._token.get = (requestProperties, callback) => {
    // check the id if valid
    const id = typeof requestProperties.queryStringObject.id === 'string'
        && requestProperties.queryStringObject.id.trim().length === 20
            ? requestProperties.queryStringObject.id
            : false;
    if (id) {
        // lookup the token
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    error: 'Requested token was not found!',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested token was not found!',
        });
    }
};

handler._token.put = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string'
        && requestProperties.body.id.trim().length === 20
            ? requestProperties.body.id
            : false;
    const extend = !!(
        typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true
    );

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            const tokenObject = parseJSON(tokenData);
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;
                // store the updated token
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200);
                    } else {
                        callback(500, {
                            error: 'There was a server side error!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Token already expired!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request',
        });
    }
};

// handler._token.delete = (requestProperties, callback) => {

// };
module.exports = handler;