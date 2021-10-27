"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const readDatabase = require("./utils").readDatabase;
const createObjectWithID = require("./utils").createObjectWithID;
const getMaxId = require("./utils").getMaxId;
const writeDatabase = require("./utils").writeDatabase;

const jsonParser = bodyParser.json();

let books;

router.use(async(req, res, next) => {
    try {
        books = await readDatabase();
        next();
    } catch (error) {
        next(error); // For error handling middlware
    }
})

router.get("/", (req, res, next) => {
    res.send(books);
});

router.post("/", jsonParser, async(req, res, next) => {
    const book = createObjectWithID(getMaxId(books) + 1, req.body);
    books.push(book);
    await writeDatabase(books);
    res.status(201).send(book);
});

router.put("/:id", jsonParser, async(req, res, next) => {
    const id = parseInt(req.params.id);
    const changeIndex = books.map(x => x.id).indexOf(id); // Index of the array for update
    const book = createObjectWithID(id, req.body);

    books[changeIndex] = book; // Make the update
    await writeDatabase(books);
    res.status(204).send(book);
});

module.exports = router;