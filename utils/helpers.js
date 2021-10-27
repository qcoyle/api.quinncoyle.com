const crypto = require("crypto");

const createObjectWithId = (id, body) => {
    const bookObject = {
        ... { id: id },
        ...body
    }
    return bookObject;
}

const getNewId = () => {
    return crypto.randomBytes(3).toString('hex'); // Random string
}

const getIndexByInnerObjectId = (id, array) => {
    return array.map(x => x.id).indexOf(id);
}

module.exports = { createObjectWithId, getNewId, getIndexByInnerObjectId };