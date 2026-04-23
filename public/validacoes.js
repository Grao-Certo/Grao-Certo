/* Tela de cadastro */
function verificar() { // Para a senha ser forte, ela tem que cumprir 3 critérios 
    let senha = input_senha.value; // ter letras Maiusculas, minuscula e ter pelo menos 8 caracteres
    let tamanho = senha.length >= 8;
    let maiusculas = senha != senha.toLowerCase();
    let minusculas = senha != senha.toUpperCase();
    let criterios = 0;

    if (tamanho) criterios++;
    if (maiusculas) criterios++;
    if (minusculas) criterios++;

    if (criterios == 3) {
        div_mensagem.innerHTML = `Senha Forte!`  // atingiu todos os critérios de segurança
    } else if (criterios == 2 && senha.length > 4) {
        div_mensagem.innerHTML = `Senha Média. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // atingiu 2 critérios de segurança
    } else if (criterios == 2) {
        div_mensagem.innerHTML = `Senha Fraca. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // atingiu 2 critérios de segurança
    } else if (criterios == 1) {
        div_mensagem.innerHTML = `Senha Insegura. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // atingiu 1 critério de segurança
    } else {
        div_mensagem.innerHTML = `Senha Insegura. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // não atingiu nenhum critério de segurança  
    }
}

function cadastrar() {
    let pessoa = select_pessoa.value;
    let nome = input_nome.value;
    let doc = input_doc.value;
    let cep = input_cep.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let confirmarSenha = input_confirmar_senha.value;

    let emailValido = false;
    let validaEmail = ['@sptech.school', '@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com']

    for (let i = 0; i < validaEmail.length; i++) {
        if (email.endsWith(validaEmail[i])) {
            emailValido = true;
        }
    }

    if (pessoa == 'Usuário') { // TIPO DE PESSOA

        if (nome != '') { // NOME DO USUÁRIO

            if (doc.length == 14 && doc[3] == '.' && doc[7] == '.' && doc[11] == '-') {

                if (cep.length == 9 && cep[5] == '-') { // CEP

                    if (emailValido) {

                        if (confirmarSenha == senha) { // Confirme sua senha
                            div_erro.innerHTML = '<span style="color: green;"> Cadastro realizado com sucesso!'

                        } else {
                            div_erro.innerHTML = 'A senha não é compatível com a anterior'
                        }
                    } else {
                        div_erro.innerHTML = 'Digite um email válido'
                    }
                } else {
                    div_erro.innerHTML = 'Digite um CEP válido'
                }
            } else {
                div_erro.innerHTML = 'Digite um CPF válido'
            }
        } else {
            div_erro.innerHTML = 'Digite seu nome'
        }

    } else if (pessoa == 'Empresa') { // TIPO DE PESSOA

        if (nome != '') { // NOME DO USUÁRIO 

            if (doc.length == 18 && doc[2] == '.' && doc[6] == '.' && doc[10] == '/' && doc[15] == '-') {

                if (cep.length == 9 && cep[5] == '-') { // CEP

                    if (emailValido) {

                        if (confirmarSenha == senha) { // Confirme sua senha
                            div_erro.innerHTML = '<span style="color: green;"> Cadastro realizado com sucesso!'

                        } else {
                            div_erro.innerHTML = 'A senha não é compatível com a anterior'
                        }
                    } else {
                        div_erro.innerHTML = 'Digite um email válido'
                    }
                } else {
                    div_erro.innerHTML = 'Digite um CEP válido'
                }
            } else {
                div_erro.innerHTML = 'Digite um CNPJ válido'
            }
        } else {
            div_erro.innerHTML = 'Digite seu nome'
        }
    } else {
        div_erro.innerHTML = 'Selecione uma opção!'
    }

}

let validacao = 3;
/* Tela de login */
function logar() {
    let email = input_email.value;
    let senha = input_senha.value;

    let emailFicticio = 'brandao123@sptech.school';
    let senhaFicticia = 'Clara123';


    if (validacao > 0) {

        if (email == emailFicticio && senha == senhaFicticia) {
            alert('Login realizado com sucesso!')
            window.location.href = "dashboard.html";
        } else {
            div_erro.innerHTML = 'Usuário ou senha errada.'
            validacao--;
        }

    } else {
        alert('Usuário bloqueado')
    }
}

function colocarEmpresa() {
    const documento = document.getElementById('input_doc');
    const select = document.getElementById('select_pessoa');
    const iptNome = document.getElementById('input_nome');
    const tipoPessoa = select.value;

    if (tipoPessoa == 'Empresa') {
        iptNome.placeholder = 'Nome da Empresa ';
        documento.placeholder = 'CNPJ: xx.xxx.xxx/xxxx-xx';
    } else {
        iptNome.placeholder = 'Nome Completo '
        documento.placeholder = 'CPF: xxx.xxx.xxx-xx'
    }
}
