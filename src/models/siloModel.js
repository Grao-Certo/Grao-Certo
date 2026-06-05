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

function buscarMedidaMaisRecente(idSilo) {
    var instrucaoSql = `
        SELECT 
            s.id AS idSilo,
            s.raio,
            s.altura_total AS alturaTotal,
            s.altura_cone AS alturaCone,
            t.distancia_superficie AS distanciaSuperficie,
            t.data_hora AS dataHora,
            DATE_FORMAT(t.data_hora, '%d/%m/%Y %H:%i:%s') AS dataHoraFormatada
        FROM silo AS s
        JOIN sensor AS se ON se.fk_silo = s.id
        JOIN telemetria AS t ON t.fk_sensor = se.id
        WHERE s.id = ${idSilo}
        ORDER BY t.data_hora DESC, t.id DESC
        LIMIT 2;
    `;
    return database.executar(instrucaoSql);
}

function buscarVolumeMensal(idSilo) {
    var instrucaoSql = `
        SELECT 
            MONTH(t.data_hora) AS mes,
            YEAR(t.data_hora) AS ano,
            MAX(ROUND(3.1416 * s.raio * s.raio * (s.altura_total - t.distancia_superficie), 2)) AS max_volume,
            s.raio,
            s.altura_total AS alturaTotal,
            s.altura_cone AS alturaCone
        FROM silo AS s
        JOIN sensor AS se ON se.fk_silo = s.id
        JOIN telemetria AS t ON t.fk_sensor = se.id
        WHERE s.id = ${idSilo}
        GROUP BY YEAR(t.data_hora), MONTH(t.data_hora), s.raio, s.altura_total, s.altura_cone
        ORDER BY ano ASC, mes ASC;
    `;
    return database.executar(instrucaoSql);
}

function buscarMovimentacaoSemanal(idSilo) {
    let instrucaoSql = `
        SELECT 
            DATE_FORMAT(data_hora, '%d/%m') AS dia_mes,
            SUM(entrada_m3) AS total_entrada,
            SUM(saida_m3) AS total_saida
        FROM vw_entrada_saida_silo
        WHERE id_silo = ${idSilo}
          AND data_hora >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DATE(data_hora), DATE_FORMAT(data_hora, '%d/%m')
        ORDER BY DATE(data_hora) ASC;
    `;
    return database.executar(instrucaoSql);
}
function buscarOscilacaoDiaria(idSilo){
    console.log("ACESSEI O SILO MODEL");

    let instrucaoSql = `
             SELECT 
            CASE DAYOFWEEK(v.data_hora)
                WHEN 1 THEN 'Dom'
                WHEN 2 THEN 'Seg'
                WHEN 3 THEN 'Ter'
                WHEN 4 THEN 'Qua'
                WHEN 5 THEN 'Qui'
                WHEN 6 THEN 'Sex'
                WHEN 7 THEN 'Sáb'
            END AS dia_semana,
        
            MAX(v.volume_atual) AS fechamento_diario,
            vts.volume_total AS volume_total

        FROM 
            vw_entrada_saida_silo v
        
        JOIN (
                SELECT DATE(data_hora) AS data_dia, MAX(data_hora) AS ultima_hora
                FROM vw_entrada_saida_silo
                WHERE id_silo = 1
                GROUP BY DATE(data_hora)
            ) ult_leitura ON DATE(v.data_hora) = ult_leitura.data_dia 
                        AND v.data_hora = ult_leitura.ultima_hora
        JOIN vw_volume_total_silo AS vts ON vts.id_silo = v.id_silo
        WHERE 
            v.id_silo = 1
        GROUP BY 
            DATE(v.data_hora), DAYOFWEEK(v.data_hora)
        ORDER BY 
            DATE(v.data_hora) DESC
        LIMIT 7;
    `;
    console.log(instrucaoSql)
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarSilo,
	buscarSilos,
	obterTotalSilos,
	obterDadosGerais,
    buscarMedidaMaisRecente,
    buscarVolumeMensal,
    buscarMovimentacaoSemanal,
    buscarOscilacaoDiaria
};