"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const readDatabase = require("../utils/db.js").readDatabase;
const writeDatabase = require("../utils/db.js").writeDatabase;
const createObjectWithID = require("../utils/helpers.js").createObjectWithId;
const getNewId = require("../utils/helpers.js").getNewId;
const getIndexByInnerObjectId = require("../utils/helpers.js").getIndexByInnerObjectId;

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
    res.send("Please make a request to an endpoint in api.quinncoyle.com/docs");
});

router.get("/books", (req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'See all books' */

    res.send(books);
});

router.get("/books/:id", (req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Get book by id' */

    idInt = parseInt(req.params.id); // Id to integer
    const index = books.map(x => x.id).indexOf(idInt)
    if (index !== -1) {
        res.status(204).send(books[index]);
    } else {
        res.status(404).send();
    }
});

router.post("/books", jsonParser, async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Add a book' */

    const book = createObjectWithID(getNewId(books), req.body);
    books.push(book);
    await writeDatabase(books);
    res.status(201).send(book);
});

router.put("books/:id", jsonParser, async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Modify a book' */
    const book = createObjectWithID(req.params.id, req.body);

    books[getIndexByInnerObjectId(req.params.id, books)] = book; // Make the update
    await writeDatabase(books);
    res.status(204).send(book);
});

router.delete("books/:id", async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Delete a book' */
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