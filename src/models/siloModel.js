let database = require("../database/config")

function cadastrarSilo(tipo, altura, comprimento, largura, raio, alturaCone) {
    console.log(
        `ACESSEI O SILO MODEL

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

    let instrucaoSql = `
        INSERT INTO silo (tipo_silo, altura_total, comprimento, largura, raio, altura_cone, fk_empresa) VALUES ('${tipo}', '${altura}', '${comprimento}', '${largura}', '${raio}', '${alturaCone}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSilos(idUsuario){
	console.log("ACESSEI O SILO MODEL");

	let instrucaoSql = `
		SELECT 
			s.*
		FROM
			silo AS s
		JOIN
			empresa AS e ON e.id = s.fk_empresa
		JOIN
			usuario AS u ON u.fk_empresa = e.id
		WHERE
			u.id = ${idUsuario};
	`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarSilo
};