// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    callback(404, {
        message: 'Url Not Found',
    });
};

module.exports = handler;
