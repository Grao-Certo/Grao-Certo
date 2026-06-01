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
	console.log(`
		ACESSEI O SILO MODEL:
		function obterDadosGerais:
		empresa Atual : ${idEmpresa}
	`);

    var instrucaoSql = `
        SELECT 
            v.id_silo,
            v.volume_atual,
            v.volume_total,
            s.fk_empresa
        FROM 
            vw_volume_silo v
        JOIN 
            silo s ON v.id_silo = s.id
        WHERE 
            s.fk_empresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarSilo,
	buscarSilos,
	obterTotalSilos,
	obterDadosGerais
};