#!/usr/bin/env node

const express = require("express");
const logger = require("morgan");
const cors = require("cors"); // To allow AJAX requests from Javascript
const app = express();

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const booksRouter = require("./routes/books.js");

app.use(logger("dev"));
app.use("/books", booksRouter);

const corsOptions = {
    origin: "https://quinncoyle.com"
}

app.use(cors(corsOptions));

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