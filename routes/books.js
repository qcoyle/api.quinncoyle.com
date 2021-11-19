"use strict";

const router = require("express").Router();
const jsonParser = require("body-parser").json();

const uri = "mongodb+srv://quinn:gru@cluster0.wqwjw.mongodb.net/apiquinncoylecom?retryWrites=true&w=majority";
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let collection;

router.use(async(req, res, next) => {
    try {
        collection = client.db("apiquinncoylecom").collection("books");
        next();
    } catch (error) {
        next(error); // For error handling middlware
    }
});

router.get("/", (req, res, next) => {
    res.send("Please make a request to an endpoint in api.quinncoyle.com/docs");
});

router.get("/books", async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'See all books' */

    try {
        await client.connect();

        res.send(await collection.find().sort({ read_date: -1 }).toArray()); // Sends sorted from newest to oldest
    } finally {
        await client.close();
    }
});

router.get("/books/:id", async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Get book by id' */

    try {
        await client.connect();

        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        res.send(await collection.find(query).toArray());
    } finally {
        await client.close();
    }
});

router.post("/books", jsonParser, async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Add a book' */

    try {
        await client.connect();

        const result = await collection.insertMany(req.body);
        console.log(`Modified ${result.modifiedCount} document(s)`);
        res.status(201).send(req.body);
    } finally {
        await client.close();
    }
});

router.put("/books/:id", jsonParser, async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Modify a book' */

    try {
        await client.connect();

        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const replacement = req.body;

        const result = await collection.replaceOne(query, replacement);
        console.log(`Modified ${result.modifiedCount} document(s)`);
        res.status(204).send();
        client.close();
    } finally {
        await client.close();
    }
});

router.delete("/books/:id", async(req, res, next) => {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Delete a book' */

    try {
        await client.connect();

        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await collection.deleteOne(query);
        res.status(204).send();
    } finally {
        await client.close();
    }
});

module.exports = router;