var express = require("express");
var router = express.Router();

var siloController = require("../controllers/siloController");

router.post("/cadastrarSilo", function (req, res) {
    siloController.cadastrarSilo(req, res);
});

router.get("/buscarSilos/:idUsuario", function (req,res){
    siloController.buscarSilos(req,res);
});

router.get("/totalSilos/:idEmpresa", function (req, res) {
    siloController.obterTotalSilos(req, res);
});

router.get("/obterDadosGerais/:idEmpresa", function (req,res){
    siloController.obterDadosGerais(req,res);
});

router.get("/buscarMedidaMaisRecente/:idSilo", function (req, res) {
    siloController.buscarMedidaMaisRecente(req, res);
});

router.get("/buscarVolumeMensal/:idSilo", function (req, res) {
    siloController.buscarVolumeMensal(req, res);
});
router.get("/buscarOscilacaoDiaria/:idSilo", function (req,res){
    siloController.buscarOscilacaoDiaria(req,res);
})

router.get("/buscarMovimentacaoSemanal/:idSilo", function (req, res) {
    siloController.buscarMovimentacaoSemanal(req, res);
});

module.exports = router;