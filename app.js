#!/usr/bin/env node

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const port = normalizePort(process.env.PORT || "5501");
app.set("port", port);

const booksRouter = require("./routes/books.js");

app.use(logger("dev"));
app.use(cors());
app.use("/books", booksRouter);

app.get("/", (req, res, next) => {
    res.send("Please make a request to /books");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port }`);
});

function normalizePort(val) {
    var port = parseInt(val, 10);

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