const express = require("express");
const app = express();
const PORT = 5501;

const booksRouter = require("./routes/books.js")

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT }`);
});