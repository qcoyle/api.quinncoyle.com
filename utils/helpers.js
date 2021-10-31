const crypto = require("crypto");

const createObjectWithId = (id, body) => {
    const bookObject = {
        ... { id: id },
        ...body
    }
    return bookObject;
}

const getNewId = () => {
    return Date.now(); // Simple unique id
}

const getIndexByInnerObjectId = (id, array) => {
    return array.map(x => x.id).indexOf(id);
}

module.exports = { createObjectWithId, getNewId, getIndexByInnerObjectId };