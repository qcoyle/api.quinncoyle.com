"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const fsPromise = require("fs").promises;

const jsonParser = bodyParser.json();

router.get("/", async(req, res, next) => {
    console.log("Request receieved");
    try {
        const books = await readDatabase();
        console.log(books);
        res.send(books);
    } catch (error) {
        next(error); // For error handling middlware
    }
});

router.post("/", jsonParser, (req, res, next) => {
    const idObj = {
        id: getMaxId(books) + 1
    };

    const body = {
        ...idObj,
        ...req.body
    };
    books.push(body);
    writeDatabase;
    res.status(201).send(body);
});

// router.put("/id", (req, res, next) => {
//     const bookUpdate = req.query;

//     books.push()
// });

const readDatabase = async() => {
    const data = await fsPromise.readFile("./routes/books-database.json").catch((err) => console.error("Failed to read file", err));
    return JSON.parse(data);
}

const writeDatabase = () => {
    fs.writeFile("./routes/books-database.json"), JSON.stringify(books), err => {
        if (err) throw err;
        console.log("Wrote to database");
    }
}

const getMaxId = array => {
    const maxId = array.reduce(
        (max, array) => (array.id > max ? array.id : max),
        array[0].id
    );
    return maxId;
}

module.exports = router;