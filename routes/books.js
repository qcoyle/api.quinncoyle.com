const router = require("express").Router();

const obj = {
    title: "Hello world",
    author: "Hola mundial"
}

router.get("/", (req, res, next) => {
    console.log("Get request received");
    res.json(obj);
});

module.exports = router;