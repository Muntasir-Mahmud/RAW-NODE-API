/*
 * Title : Uptime Monitoring Applicaction
 * Description : A RESTful API to monitor up or down time of user defined links
 * Author : Muntasir Mahmud
 * Date : 9/5/2021
 *
 */

// dependencies
const http = require('http');

// app object - module scaffholding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to the port ${app.config.port}`);
    });
};

// handel Request Response
app.handleReqRes = (req, res) => {
    res.end('Hello siam');
};

// start the server
app.createServer();
