"use strict";

const router = require("express").Router();
const bodyParser = require("body-parser");
const readDatabase = require("../utils/db.js").readDatabase;
const writeDatabase = require("../utils/db.js").writeDatabase;
const createObjectWithID = require("../utils/helpers.js").createObjectWithId;
const getNewId = require("../utils/helpers.js").getNewId;
const getIndexByInnerObjectId = require("../utils/helpers.js").getIndexByInnerObjectId;

const uri = "mongodb+srv://quinn:gru@cluster0.wqwjw.mongodb.net/apiquinncoylecom?retryWrites=true&w=majority";
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let collection;

const jsonParser = bodyParser.json();

let books;
router.use(async(req, res, next) => {
    try {
        collection = client.db("apiquinncoylecom").collection("books");
        next();
    } catch (error) {
        next(error); // For error handling middlware
    }
})

router.get("/", (req, res, next) => {
    res.send("Please make a request to an endpoint in api.quinncoyle.com/docs");
});

router.get("/books", async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'See all books' */

    try {
        client.connect(async(err) => {
            if (err) {
                console.log(err);
            }
            res.send(await collection.find({}).toArray());
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
});

router.get("/books/:id", (req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Get book by id' */

    // idInt = parseInt(req.params.id); // Id to integer
    // const index = books.map(x => x.id).indexOf(idInt)
    // if (index !== -1) {
    //     res.status(204).send(books[index]);
    // } else {
    //     res.status(404).send();
    // }

    const id = req.params.id;
    console.log(typeof(id));
    const objectId = new ObjectId(id);
    try {
        client.connect(async(err) => {
            if (err) {
                console.log(err);
            }
            res.send(await collection.find({ _id: ObjectId(id) }).toArray());
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
});

router.post("/books", jsonParser, async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Add a book' */

    // const book = createObjectWithID(getNewId(books), req.body);
    // books.push(book);
    // await writeDatabase(books);

    const books = req.body;
    try {
        client.connect(async(err) => {
            await collection.insertMany(books);
            res.status(201).send(books);
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
});

router.put("books/:id", jsonParser, async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Modify a book' */
    const book = createObjectWithID(req.params.id, req.body);

    books[getIndexByInnerObjectId(req.params.id, books)] = book; // Make the update
    await writeDatabase(books);
    res.status(204).send(book);
});

router.delete("/books", async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Delete a book' */
    // const deleteIndex = getIndexByInnerObjectId(req.params.id, books); // Index of the array for update
    // if (deleteIndex !== -1) {
    //     books.splice(deleteIndex, 1); // Remove from array at index
    //     await writeDatabase(books);
    //     res.status(204).send();
    // } else {
    //     res.status(404).send();
    // }

    try {
        client.connect(async(err) => {
            let myQuery = { id: [0 - 9] }

            await collection.deleteMany(myQuery);
            res.status(204).send();
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;