/*
 * Title : Utilities
 * Description : Important utilities functions
 * Author : Muntasir Mahmud
 * Date : 15/5/2021
 *
 */

// dependencies

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

// export module
module.exports = utilities;
