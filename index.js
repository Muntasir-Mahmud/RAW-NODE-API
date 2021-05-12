/*
 * Title : Uptime Monitoring Applicaction
 * Description : A RESTful API to monitor up or down time of user defined links
 * Author : Muntasir Mahmud
 * Date : 9/5/2021
 *
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');

// app object - module scaffholding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to the port ${environment.port}`);
    });
};

// handel Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
