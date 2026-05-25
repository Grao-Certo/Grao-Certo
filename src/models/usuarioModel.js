var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
        `ACESSEI O USUARIO MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function entrar():

		email: ${email}
		senha: ${senha}`
    )
    var instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkEmpresa, tipoUsuario) {
    console.log(`
        ACESSEI O USUARIO MODEL

        >> Se aqui der erro de 'Error: connect ECONNREFUSED',
        >> verifique suas credenciais de acesso ao banco
        >> e se o servidor de seu BD está rodando corretamente.

        function cadastrar():

        nome: ${nome}
        email: ${email}
        senha: ${senha}
        fkEmpresa: ${fkEmpresa}
        tipoUsuario: ${tipoUsuario}
    `);

    var tipoFormatado = tipoUsuario ? tipoUsuario.toLowerCase() : 'operador';

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, tipo_usuario, fk_empresa) 
        VALUES ('${nome}', '${email}', '${senha}', '${tipoFormatado}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL no usuarioModel: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};