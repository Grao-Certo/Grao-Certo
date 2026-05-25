var express = require("express");
var router = express.Router();

var siloController = require("../controllers/siloController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarSilo", function (req, res) {
    siloController.cadastrarSilo(req, res);
});

module.exports = router;