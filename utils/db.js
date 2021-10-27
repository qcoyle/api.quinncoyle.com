const fsPromise = require("fs").promises;

const readDatabase = async() => {
    const data = await fsPromise.readFile("./database.json").catch((err) => console.error("Failed to read file", err));
    return JSON.parse(data);
}

const writeDatabase = async(object) => {
    await fsPromise.writeFile("./database.json", JSON.stringify(object)).catch((err) => console.error("Failed to write file", err));
}

module.exports = { readDatabase, writeDatabase };