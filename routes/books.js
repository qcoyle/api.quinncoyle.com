"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const utils = require("./utils");

const jsonParser = bodyParser.json();

let books;

router.use(async(req, res, next) => {
    try {
        books = await utils.readDatabase();
        next();
    } catch (error) {
        next(error); // For error handling middlware
    }
})

router.get("/", (req, res, next) => {
    res.send(books);
});

router.post("/", jsonParser, async(req, res, next) => {
    const newId = {
        id: getMaxId(books) + 1
    };

    const book = {
        ...newId,
        ...req.body
    };

    books.push(book);
    await utils.writeDatabase(books);
    res.status(201).send(book);
});

router.put("/:id", jsonParser, async(req, res, next) => {
    const id = parseInt(req.params.id);
    const changeIndex = books.map(x => x.id).indexOf(id);

    const body = {
        ... { id: id },
        ...req.body
    }

    books[changeIndex] = body; // Make the update
    await utils.writeDatabase(books);
    res.status(204).send(body);
});

module.exports = router;