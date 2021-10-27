const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 5501;

const booksRouter = require("./routes/books.js");

app.use("/books", booksRouter);
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
    console.log("Get request to main program");
    res.send("This is a test");
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT }`);
});