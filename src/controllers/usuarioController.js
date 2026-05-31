var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            empresaId: resultadoAutenticar[0].empresaId,
                            tipo: resultadoAutenticar[0].tipo
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send(`<span class="erro"> Email e/ou senha inválido(s)`);
                    } else {
                        res.status(403).send(`<span class="erro"> Mais de um usuário com o mesmo login e senha!`);
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarEmpresa(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está Indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinino!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A empresa a vincular está indefinida!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
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
function cadastrarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var tipoUsuario = req.body.tipoUsuarioServer;

    if (nome == "" || nome == null) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (email == "" || email == null) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == "" || senha == null) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, tipoUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrarUsuario,
    cadastrarEmpresa
}