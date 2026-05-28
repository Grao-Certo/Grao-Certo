var express = require("express");
var router = express.Router();

var siloController = require("../controllers/siloController");

router.post("/cadastrarSilo", function (req, res) {
    siloController.cadastrarSilo(req, res);
});

module.exports = router;