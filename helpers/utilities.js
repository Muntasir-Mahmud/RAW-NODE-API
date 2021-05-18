/*
 * Title : Utilities
 * Description : Important utilities functions
 * Author : Muntasir Mahmud
 * Date : 15/5/2021
 *
 */

// dependencies
const crypto = require('crypto');
const environments = require('./environments');

// module scaffholding
const utilities = {};

// Parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// hash staring
utilities.hash = (hashString) => {
    if (typeof hashString === 'string' && hashString.length > 0) {
        const hash = crypto
            .createHash('sha256', environments.sectetKey)
            .update(hashString)
            .digest('hex');

        return hash;
    }
    return false;
};

// Create random string
utilities.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof strlength === 'number' && strlength > 0 ? strlength : false;

    if (length) {
        const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for (let i = 1; i <= length; i += 1) {
            const randomCharacter = possiblecharacters.charAt(
                // eslint-disable-next-line prettier/prettier
                Math.floor(Math.random() * possiblecharacters.length),
            );
            output += randomCharacter;
        }
        return output;
    }
    return false;
};

// export module
module.exports = utilities;
