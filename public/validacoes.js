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
    } else if (criterios == 2) {
        div_mensagem.innerHTML = `Senha Média. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // atingiu 2 critérios de segurança
    } else if (criterios == 1) {
        div_mensagem.innerHTML = `Senha fraca. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // atingiu 1 critério de segurança
    } else {
        div_mensagem.innerHTML = `Senha Insegura. Utilize maiúsculas, minúsculas <br> e pelo menos 8 caracteres.`  // não atingiu nenhum critério de segurança  
    }
}

function cadastrar() {
    let email = input_email.value;
    let nome = input_nome.value;
    let cpf = input_doc.value;
    let pessoa = select_pessoa.value;
    let cep = input_cep.value;

    let senha = input_senha.value;
    let confirmarSenha = input_confirmar_senha.value;
    
    let emailValido = false;
    let validaEmail = ['@sptech.school', '@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com']
    
    for (let i = 0; i < validaEmail.length; i++) {
        if (email.endsWith(validaEmail[i])) {
            emailValido = true;
        }
    }
    if (emailValido) {
        
        if (cpf.length == 14 && cpf[3] == '.' && cpf[7] == '.' && cpf[11] == '-') {
            
            if (pessoa == 'PJ' || pessoa == 'PF') { // TIPO DE PESSOA
                
                if (cep.length == 9 && cep[5] == '-') { // CEP
                    
                    if (confirmarSenha == senha) { // Confirme sua senha
                        
                        if (nome != '') { // NOME DO USUÁRIO
                            alert('Cadastro realizado com sucesso!')
                            window.location.href = 'login.html';
                        } else {
                            div_erro.innerHTML = 'Digite seu nome'
                        }
                    } else {
                        div_erro.innerHTML = 'A senha não é compatível com a anterior'
                    }
                } else {
                    div_erro.innerHTML = 'Digite um CEP válido'
                }
            } else {
                div_erro.innerHTML = 'Selecione uma opção!'
            }
        } else {
            div_erro.innerHTML = 'Digite um CPF válido'
        }
    } else {
        div_erro.innerHTML = 'Digite um email válido'
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

function colocarEmpresa(){
    const documento = document.getElementById('input_doc');
    const select = document.getElementById('select_pessoa');
    const iptNome = document.getElementById('input_nome');
    const tipoPessoa = select.value;

    if (tipoPessoa == 'PJ'){
        iptNome.placeholder = 'Nome da Empresa: ';
        documento.placeholder = 'CNPJ: xx.xxx.xxx/xxxx-xx';  
    } else {
        iptNome.placeholder = 'Nome Completo: '
        documento.placeholder = 'CPF: xxx.xxx.xxx-xx'  
    }
}
