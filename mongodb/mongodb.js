const { MongoClient } = require("mongodb");
const updateCollection = require("./updateCollection");
const uri = "mongodb+srv://quinn:gru@cluster0.wqwjw.mongodb.net/api_quinncoyle_com?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const collection = client.db("api_quinncoyle_com").collection("books");

// TODO: Logic to pass in what kind of request is being made
client.connect(async(err) => {
    // await addRecords(collection, records);
    await updateCollection.run("POST", collection, record);
    client.close();
});

const records = [{
        "title": "Norwegian Wood",
        "author": {
            "1": "Haruki Murakami"
        },
        "read_date": "2021-08-26",
        "audiobook": true
    },
    {
        "title": "One Flew Over the Cuckoo's Nest",
        "author": {
            "1": "Ken Kesey"
        },
        "read_date": "2021-08-07",
        "audiobook": true
    },
    {
        "title": "The Inner Game of Tennis",
        "author": {
            "1": "Timothy Gallwey"
        },
        "read_date": "2021-08-06",
        "audiobook": true
    }
];

const record = {
    "title": "The Code Breaker",
    "author": {
        "1": "Walter Isaacson"
    },
    "read_date": "2021-07-26",
    "audiobook": true
}