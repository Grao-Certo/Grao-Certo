var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, cnpj, email, cep, numero, complemento) {
  var instrucaoSql = `
    INSERT INTO empresa (nome, cnpj, email, cep, numero_endereco, complemento_endereco) 
    VALUES ('${nome}', '${cnpj}', '${email}', '${cep}', '${numero}', '${complemento}');
  `;
  console.log("Executando a instrução SQL no empresaModel: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
