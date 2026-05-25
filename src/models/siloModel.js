var database = require("../database/config")

function cadastrarSilo(tipo, altura, comprimento, largura, raio, alturaCone) {
    console.log(
        `ACESSEI O USUARIO MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function cadastrarSilo():

		tipo: ${tipo}
		altura: ${altura}
		comprimento: ${comprimento}
		largura: ${largura}
		raio: ${raio}
		alturaCone: ${alturaCone}`
    );

    var instrucaoSql = `
        INSERT INTO silo (tipo_silo, altura_total, comprimento, largura, raio, altura_cone, fk_empresa) VALUES ('${tipo}', '${altura}', '${comprimento}', '${largura}', '${raio}', '${alturaCone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarSilo
};