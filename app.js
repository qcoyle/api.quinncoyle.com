#!/usr/bin/env node

const express = require("express");
const logger = require("morgan");
const cors = require("cors"); // To allow AJAX requests from Javascript
const swaggerUi = require('swagger-ui-express'); // https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284
const swaggerFile = require('./swagger-output.json');


const app = express();

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const booksRouter = require("./routes/books.js");

const corsOptions = {
    origin: "https://quinncoyle.com", // Only allow CORS requests for quinncoyle.com
    origin: "http://127.0.0.1:3000" // Test server
}

app.use(cors(corsOptions));

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