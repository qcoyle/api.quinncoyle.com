const router = require("express").Router();

const data = require("./books-database.json");

router.get("/", (req, res, next) => {
    console.log("Get request received");
    res.json(data);
});

module.exports = router;