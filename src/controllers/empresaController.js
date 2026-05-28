var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
    var cnpj = req.query.cnpj;

    empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function listar(req, res) {
    empresaModel.listar().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    empresaModel.buscarPorId(id).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    if (nome == undefined) {
        res.status(400).send("O nome da empresa está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("O CNPJ da empresa está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email da empresa está indefinido!");
    } else {
        empresaModel.cadastrar(nome, cnpj, email, cep, numero, complemento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log(`\nErro ao realizar o cadastro! Erro: ${erro.sqlMessage}`);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarPorCnpj,
    buscarPorId,
    cadastrar,
    listar,
};