var express = require("express");
var router = express.Router();

var siloController = require("../controllers/siloController");

router.post("/cadastrarSilo", function (req, res) {
    siloController.cadastrarSilo(req, res);
});

router.get("/buscarSilos/:idUsuario", function (req,res){
    siloController.buscarSilos(req,res);
});

module.exports = router;