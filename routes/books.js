"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const readDatabase = require("./utils").readDatabase;
const createObjectWithID = require("./utils").createObjectWithID;
const getNewId = require("./utils").getNewId;
const writeDatabase = require("./utils").writeDatabase;
const getIndexByInnerObjectId = require("./utils").getIndexByInnerObjectId;

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
    const book = createObjectWithID(getNewId(books), req.body);
    books.push(book);
    await writeDatabase(books);
    res.status(201).send(book);
});

router.put("/:id", jsonParser, async(req, res, next) => {
    const book = createObjectWithID(req.params.id, req.body);

    books[getIndexByInnerObjectId(req.params.id, books)] = book; // Make the update
    await writeDatabase(books);
    res.status(204).send(book);
});

router.delete("/:id", async(req, res, next) => {
    const deleteIndex = getIndexByInnerObjectId(req.params.id, books); // Index of the array for update
    if (deleteIndex !== -1) {
        books.splice(deleteIndex, 1); // Remove from array at index
        await writeDatabase(books);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = router;