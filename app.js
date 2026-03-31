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
        div_mensagem.innerHTML = `Senha Forte`  // atingiu todos os critérios de segurança
    } else if (criterios == 2) {
        div_mensagem.innerHTML = `Senha Média`  // atingiu 2 critérios de segurança
    } else if (criterios == 1) {
        div_mensagem.innerHTML = `Senha Fraca`  // atingiu 1 critério de segurança
    } else {
        div_mensagem.innerHTML = `Senha Insegura`  // não atingiu nenhum critério de segurança  
    }
}

function cadastrar() {
    let email = input_email.value;
    let nome = input_nome.value;

    if (email.includes('@') && email.includes('.com') && nome != '') {
        alert('Cadastro realizado com sucesso!')
        window.location.href = "login.html";
    } else {
        alert('Digite um email ou usuário válido')
    }
}
 
/* Tela de login */
function logar() {
        let email = input_email.value;
        let senha = input_senha.value;

        let emailFicticio = 'brandao123@sptech.com';
        let senhaFicticia = 'Clara123';

        if (email == emailFicticio && senha == senhaFicticia) {
            alert('Login realizado com sucesso!')
            window.location.href = "index.html";      
        } else {
            alert('Usuário ou senha errada.')
        }
    }