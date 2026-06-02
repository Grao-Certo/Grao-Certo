let database = require("../database/config")

function cadastrarSilo(altura, comprimento, largura, raio, alturaCone,fkEmpresa) {
    console.log(
        `ACESSEI O SILO MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function cadastrarSilo():

		altura: ${altura}
		comprimento: ${comprimento}
		largura: ${largura}
		raio: ${raio}
		alturaCone: ${alturaCone}`
    );

    let instrucaoSql = `
        INSERT INTO silo (altura_total, comprimento, largura, raio, altura_cone, fk_empresa) VALUES ('${altura}', '${comprimento}', '${largura}', '${raio}', '${alturaCone}',${fkEmpresa});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSilos(idUsuario){
	console.log(`
		ACESSEI O SILO MODEL

		function buscarSilos():
		idUsuario : ${idUsuario}
	`);

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

function obterTotalSilos(idEmpresa) {
	console.log(`
		ACESSEI O SILO MODEL:
		function obterTotalSilos:
		empresa Atual : ${idEmpresa}
	`);

    var instrucaoSql = `
        SELECT COUNT(id) AS total FROM silo WHERE fk_empresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}

function obterDadosGerais(idEmpresa) {
    var instrucaoSql = `
        SELECT s.id AS id_silo, s.raio, s.altura_total, s.altura_cone, AVG(t.distancia_superficie) AS distancia_superficie, s.fk_empresa
        FROM silo AS s
        JOIN sensor AS se ON se.fk_silo = s.id
        JOIN telemetria AS t ON t.fk_sensor = se.id
        JOIN (
            SELECT fk_sensor, MAX(id) AS max_id 
            FROM telemetria 
            GROUP BY fk_sensor
        ) AS maisRecente 
		ON t.id = maisRecente.max_id
        WHERE s.fk_empresa = ${idEmpresa}
        GROUP BY s.id, s.raio, s.altura_total, s.altura_cone, s.fk_empresa;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarSilo,
	buscarSilos,
	obterTotalSilos,
	obterDadosGerais
};