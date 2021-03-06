#!/usr/bin/env node

require('newrelic'); // Diagnostics

const express = require("express");
const logger = require("morgan");
const cors = require("cors"); // To allow AJAX requests from Javascript
const swaggerUi = require('swagger-ui-express'); // https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284
const swaggerFile = require('./swagger-output.json');

const app = express();

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const booksRouter = require("./routes/books.js");

app.use(cors());
app.use(logger("dev"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // docs is the export filename
app.use(booksRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port }`);
});

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}