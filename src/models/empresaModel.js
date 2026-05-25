let database = require("../database/config");

function buscarPorId(id) {
  console.log(
    `
    ACESSEI O EMPRESA MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function buscarPorId():

		id: ${id}`
  );

  let instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  console.log(
    `
    ACESSEI O EMPRESA MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function listar():`
  );

  let instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  console.log(
    `
    ACESSEI O EMPRESA MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function buscarPorCnpj():

		cnpj: ${cnpj}`
  );

  let instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, cnpj, email, cep, numero, complemento) {
  console.log(
    `
    ACESSEI O EMPRESA MODEL

		>> Se aqui der erro de 'Error: connect ECONNREFUSED',
		>> verifique suas credenciais de acesso ao banco
		>> e se o servidor de seu BD está rodando corretamente.

		function cadastrar():

		nome: ${nome}
		cnpj: ${cnpj}
		email: ${email}
		cep: ${cep}
		numero: ${numero}
		complemento: ${complemento}
    `
  );

  let instrucaoSql = `
    INSERT INTO empresa (nome, cnpj, email, cep, numero_endereco, complemento_endereco) 
    VALUES ('${nome}', '${cnpj}', '${email}', '${cep}', '${numero}', '${complemento}');
  `;

  console.log("Executando a instrução SQL no empresaModel: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
