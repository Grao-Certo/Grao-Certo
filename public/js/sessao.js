// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");
    var b_email = document.getElementById("b_email");

    if(nome != undefined){
        b_usuario.innerHTML = nome;
    }

    if(email != undefined){
        b_email.innerHTML = email;
    }
}

function verificarLogado(){
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;
    let tipo = sessionStorage.TIPO_USUARIO

    if(nome != undefined && email != undefined){
        if(tipo == 'administrador' || tipo == 'operador'){
            li_header.innerHTML = `
            <li><a href="index.html" id="active">HOME</a></li> 
                <li><a href="#nossa_solucao">NOSSA SOLUÇÃO</a></li> 
                <li><a href="#sobreNos">SOBRE NÓS</a></li> 
                <li><a href="simulador.html#simulador-titulo-1">SIMULADOR</a></li>
                <li><a href="dashboard/dashboardGeral.html">DASHBOARD</a></li>`;
        }else if(tipo == 'suporte'){
            li_header.innerHTML = `
            <li><a href="index.html" id="active">HOME</a></li> 
                <li><a href="#nossa_solucao">NOSSA SOLUÇÃO</a></li> 
                <li><a href="#sobreNos">SOBRE NÓS</a></li> 
                <li><a href="simulador.html#simulador-titulo-1">SIMULADOR</a></li>
                <li><a href="Suporte.html">SUPORTE</a></li>`;
        }
    }
}

function validarAdmin() {
     var tipo = sessionStorage.TIPO_USUARIO;

         if(tipo == `administrador`){
            return true;
        }
            return false;
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

