"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const fsPromise = require("fs").promises;

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
    const newId = {
        id: getMaxId(books) + 1
    };

    const book = {
        ...newId,
        ...req.body
    };

    books.push(book);
    await writeDatabase(books);
    res.status(201).send(book);
});

router.put("/:id", jsonParser, async(req, res, next) => {
    const id = parseInt(req.params.id);
    const bookUpdate = req.body;
    const changeIndex = books.map(x => x.id).indexOf(id);

    const body = {
        ... { id: id },
        ...req.body
    }

    books[changeIndex] = body; // Make the update
    await writeDatabase(books);
    res.status(204).send(body);
});

const readDatabase = async() => {
    const data = await fsPromise.readFile("./routes/books-database.json").catch((err) => console.error("Failed to read file", err));
    return JSON.parse(data);
}

const writeDatabase = async(object) => {
    await fsPromise.writeFile("./routes/books-database.json", JSON.stringify(object)).catch((err) => console.error("Failed to write file", err));
}

const getMaxId = array => {
    const maxId = array.reduce(
        (max, array) => (array.id > max ? array.id : max),
        array[0].id
    );
    return maxId;
}

module.exports = router;