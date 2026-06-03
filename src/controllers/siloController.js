var siloModel = require("../models/siloModel");

function cadastrarSilo(req, res) {
    var altura = req.body.alturaServer;
    var comprimento = req.body.comprimentoServer;
    var largura = req.body.larguraServer;
    var raio = req.body.raioServer;
    var alturaCone = req.body.alturaConeServer;
    let fkEmpresa = req.body.fkEmpresaServer;

    if(fkEmpresa == undefined){
        res.status(400).send("O fkEmpresa está indefinido!");
    }else if (altura == "" || altura == null) {
        res.status(400).send("A altura está indefinido!");
    } else if (comprimento == "" || comprimento == null) {
        res.status(400).send("O comprimento está indefinido!");
    } else if (largura == "" || largura == null) {
        res.status(400).send("A largura está indefinida!");
    } else if (raio == "" || raio == null) {
        res.status(400).send("O raio está indefinida!");
    } else if (alturaCone == "" || alturaCone == null) {
        res.status(400).send("A altura do cone está indefinida!");
    } else {
        siloModel.cadastrarSilo(altura, comprimento, largura, raio, alturaCone,fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarSilos(req,res){
    let idUsuario = req.params.idUsuario;

    if(idUsuario == undefined){
        res.status(400).send("O id está undefined");
    }else{
        siloModel.buscarSilos(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function obterTotalSilos (req, res) {
    var idEmpresa = req.params.idEmpresa;

    if(idEmpresa == undefined){
        res.status(400).send("O idEmpresa retornou undefined");
    } else {
        siloModel.obterTotalSilos(idEmpresa).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

function obterDadosGerais (req, res) {
    var idEmpresa = req.params.idEmpresa;

    if(idEmpresa == undefined){
        res.status(400).send("O idEmpresa retornou undefined");
    } else {
        siloModel.obterDadosGerais(idEmpresa).then(
            function(resultado) {
                res.json(resultado);
            }
        ).catch(
            function(erro){
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function buscarMedidaMaisRecente(req, res) {
    var idSilo = req.params.idSilo;

    if (idSilo == undefined) {
        res.status(400).send("O id do silo está indefinido!");
    } else {
        siloModel.buscarMedidaMaisRecente(idSilo).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarVolumeMensal(req, res) {
    var idSilo = req.params.idSilo;

    if (idSilo == undefined) {
        res.status(400).send("O id do silo está indefinido!");
    } else {
        siloModel.buscarVolumeMensal(idSilo).then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    cadastrarSilo,
    buscarSilos,
    obterTotalSilos,
    obterDadosGerais,
    buscarMedidaMaisRecente,
    buscarVolumeMensal
}