const run = async(request, collection, body) => {
    if (request === "POST") {
        addRecord(collection, body)
    }
}

async function addRecords(collection, records) {
    try {
        await collection.insertMany(records);
    } catch (err) {
        console.log(err);
    }
}

async function addRecord(collection, record) {
    try {
        await collection.insertOne(record);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { run };