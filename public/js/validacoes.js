

/* Tela de cadastro */
let criterios = 0;
function verificar() { // Para a senha ser forte, ela tem que cumprir 3 critérios 
    let senha = input_senha.value; // ter letras Maiusculas, minuscula e ter pelo menos 8 caracteres
    let tamanho = senha.length >= 8;
    let maiusculas = senha != senha.toLowerCase();
    let minusculas = senha != senha.toUpperCase();
    criterios = 0;

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

function cadastrarUsuario() {
    let usuario = select_usuario.value;
    let nome = input_nome.value;
    let cpf = input_cpf.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let confirmarSenha = input_confirmarSenha.value;

    if (usuario == 'Operador' || usuario == 'Administrador') {

        if (nome != '') {

            if (cpf.length == 14 && cpf[3] == '.' && cpf[7] == '.' && cpf[11] == '-') {

                if (email.includes('@') && email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@') + 1 && email.lastIndexOf('.') < email.length - 1) {

                    if (criterios == 3) { // senha

                        if (confirmarSenha == senha) { // Confirme sua senha

                            let fkEmpresaLogada = sessionStorage.ID_EMPRESA;

                            fetch("/usuarios/cadastrarUsuario/",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },

                                    body: JSON.stringify({
                                        nomeServer: nome,
                                        emailServer: email,
                                        senhaServer: senha,
                                        fkEmpresaServer: fkEmpresaLogada,
                                        tipoUsuarioServer: usuario
                                    }
                                    ),
                                }
                            ).then(
                                function (resposta) {
                                    console.log("resposta: ", resposta);
                                    if (resposta.ok) {
                                        div_mensagem2.innerHTML = '<span class="acerto"> Cadastro realizado com sucesso!'

                                        setTimeout(() => {
                                            div_mensagem2.innerHTML = '<span class="acerto"> Redirecionando para a tela de login...';
                                        }, "1000");

                                        setTimeout(() => {
                                            window.location = "login.html";
                                        }, "1000");

                                        finalizarAguardar();
                                    } else {
                                        throw "Houve um erro ao tentar realizar o cadastro do usuario";
                                    }
                                })
                                .catch(function (resposta) {
                                    console.log(`#ERRO: ${resposta}`);
                                    finalizarAguardar();
                                });

                        } else {
                            div_mensagem2.innerHTML = '<span class="erro"> A senha não é compatível com a anterior'
                        }
                    } else {
                        div_mensagem2.innerHTML = '<span class="erro"> A senha precisa ser forte!'
                    }
                } else {
                    div_mensagem2.innerHTML = '<span class="erro"> Digite um email válido'
                }
            } else {
                div_mensagem2.innerHTML = '<span class="erro"> Digite um CPF válido'
            }
        } else {
            div_mensagem2.innerHTML = '<span class="erro"> Digite o nome do usuário'
        }
    } else {
        div_mensagem2.innerHTML = '<span class="erro"> Digite um tipo de usuário válido'
    }
}

function cadastrarEmpresa() {
    let nome = input_nome.value;
    let cnpj = input_cnpj.value;
    let email = input_email.value;
    let cep = input_cep.value;
    let numero = input_numero.value;
    let complemento = input_complemento.value;
    let senha = input_senha.value;
    let confirmarSenha = input_confirmarSenha.value;

    if (nome != '') {

        if (cnpj.length == 18 && cnpj[2] == '.' && cnpj[6] == '.' && cnpj[10] == '/' && cnpj[15] == '-') {

            if (email.includes('@') && email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@') + 1 && email.lastIndexOf('.') < email.length - 1) {

                if (cep.length == 9 && cep[5] == '-') {

                    if (numero != '') {

                        if (criterios == 3  ) {

                            if (senha == confirmarSenha) {

                                fetch("/empresas/cadastrarEmpresa",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(
                                            {
                                                nomeServer: nome,
                                                cnpjServer: cnpj.replace(/\D/g, ""),
                                                emailServer: email,
                                                cepServer: cep.replace(/\D/g, ""),
                                                numeroServer: numero,
                                                complementoServer: complemento
                                            }
                                        ),
                                    }
                                ).then(
                                    function (resposta) {
                                        if (resposta.ok) {
                                            resposta.json().then(jsonEmpresa => {
                                                let idEmpresaCriada = jsonEmpresa.insertId;

                                                div_mensagem2.innerHTML = '<span class="acerto"> Empresa cadastrada!</span>';

                                                fetch("/usuarios/cadastrarUsuario", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify(
                                                        {
                                                            nomeServer: nome,
                                                            emailServer: email,
                                                            senhaServer: senha,
                                                            fkEmpresaServer: idEmpresaCriada,
                                                            tipoUsuarioServer: "Administrador"
                                                        }
                                                    )
                                                }).then(
                                                    function (respostaUsuario) {
                                                        if (respostaUsuario.ok) {
                                                            div_mensagem2.innerHTML = '<span class="acerto"> Cadastro completo realizado com sucesso!</span>';
                                                            setTimeout(() => {
                                                                window.location = "login.html";
                                                            }, 500);
                                                        } else {
                                                            div_mensagem2.innerHTML = '<span class="erro"> Empresa criada, mas houve um erro ao criar o usuário administrador.</span>';
                                                        }
                                                    }
                                                );
                                            });
                                        } else {
                                            div_mensagem2.innerHTML = '<span class="erro"> Houve um erro ao cadastrar a empresa.</span>';
                                        }
                                    })
                                    .catch(function (erro) {
                                        console.log(`#ERRO: ${erro}`);
                                    });
                            } else {
                                div_mensagem2.innerHTML = '<span class="erro"> As senha não coicidem!'
                            }
                        } else {
                            div_mensagem2.innerHTML = '<span class="erro"> A senha precisa ser forte!'
                        }
                    } else {
                        div_mensagem2.innerHTML = '<span class="erro"> Digite um número de endereço válido'
                    }
                } else {
                    div_mensagem2.innerHTML = '<span class="erro"> Digite um CEP válido'
                }
            } else {
                div_mensagem2.innerHTML = '<span class="erro"> Digite um email válido'
            }
        } else {
            div_mensagem2.innerHTML = '<span class="erro"> Digite um CNPJ válido'
        }
    } else {
        div_mensagem2.innerHTML = '<span class="erro"> Digite o nome da empresa'
    }
}

let validacao = 3;
/* Tela de login */
function logar() {
    let email = input_email.value;
    let senha = input_senha.value;

    if (validacao > 0) {

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.ID_EMPRESA = json.empresaId;
                    sessionStorage.TIPO_USUARIO = json.tipo;

                    setTimeout(() => {
                        div_mensagem2.innerHTML = '<span class="acerto"> Login efetuado! Redirecionando para a dashboard..';
                    }, "1000");

                    setTimeout(function () {
                        window.location = "dashboard/dashboardGeral.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {
                div_mensagem2.innerHTML = '<span class="erro"> Usuário ou senha errada.'
                validacao--;

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;

    } else {
        alert('Usuário bloqueado')
    }
}

function cadastrarSilo() {
    let altura = input_altura.value;
    let comprimento = input_comprimento.value;
    let largura = input_largura.value;
    let raio = input_raio.value;
    let alturaCone = input_alturaCone.value;
    let fkEmpresa = sessionStorage.ID_EMPRESA;

    if (altura != '') {

        if (comprimento != '') {

            if (largura != '') {

                if (raio != '') {

                    if (alturaCone != '') { // alturaCone

                        fetch("/silo/cadastrarSilo", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                // crie um atributo que recebe o valor recuperado aqui
                                // Agora vá para o arquivo routes/usuario.js
                                alturaServer: altura,
                                comprimentoServer: comprimento,
                                larguraServer: largura,
                                raioServer: raio,
                                alturaConeServer: alturaCone,
                                fkEmpresaServer: fkEmpresa
                            }),
                        })
                            .then(function (resposta) {
                                console.log("resposta: ", resposta);

                                if (resposta.ok) {

                                    div_mensagem2.innerHTML = '<span class="acerto"> Cadastro de silo realizado com sucesso!'

                                } else {
                                    throw "Houve um erro ao tentar realizar o cadastro do usuario";
                                }
                            })
                            .catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });

                    } else {
                        div_mensagem2.innerHTML = '<span class="erro"> Adicione a altura do cone'
                    }
                } else {
                    div_mensagem2.innerHTML = '<span class="erro"> Digite o raio do silo'
                }
            } else {
                div_mensagem2.innerHTML = '<span class="erro"> Digite a largura do silo'
            }
        } else {
            div_mensagem2.innerHTML = '<span class="erro"> Digite o comprimento do silo'
        }
    } else {
        div_mensagem2.innerHTML = '<span class="erro"> Digite a altura do silo'
    }
}

function mascaraCPF(input) {
    let valorOriginal = input.value;
    let apenasNumeros = "";

    // 1. Filtrar apenas o que é número (comparando caractere por caractere)
    for (let i = 0; i < valorOriginal.length; i++) {
        let caractere = valorOriginal[i];
        // Verifica se o caractere está entre "0" e "9"
        if (caractere >= '0' && caractere <= '9') {
            apenasNumeros += caractere;
        }
    }

    // 2. Montar a máscara manualmente baseada na quantidade de números
    let valorFormatado = "";

    for (let i = 0; i < apenasNumeros.length; i++) {
        if (i === 3) {
            valorFormatado += "."; // Primeiro ponto
        } else if (i === 6) {
            valorFormatado += "."; // Segundo ponto
        } else if (i === 9) {
            valorFormatado += "-"; // Hífen
        }
        valorFormatado += apenasNumeros[i];
    }

    // 3. Atualiza o campo com o valor filtrado e formatado
    input.value = valorFormatado;
}

function mascaraCNPJ(input) {
    let valorOriginal = input.value;
    let apenasNumeros = "";

    // 1. Filtrar apenas o que é número (comparando caractere por caractere)
    for (let i = 0; i < valorOriginal.length; i++) {
        let caractere = valorOriginal[i];
        // Verifica se o caractere está entre "0" e "9"
        if (caractere >= '0' && caractere <= '9') {
            apenasNumeros += caractere;
        }
    }

    // 2. Montar a máscara manualmente baseada na quantidade de números
    let valorFormatado = "";

    for (let i = 0; i < apenasNumeros.length; i++) {
        if (i === 2) {
            valorFormatado += "."; // Primeiro ponto
        } else if (i === 5) {
            valorFormatado += "."; // Segundo ponto
        } else if (i === 8) {
            valorFormatado += "/"; // Barra
        } else if (i === 12) {
            valorFormatado += '-' // Hífen
        }
        valorFormatado += apenasNumeros[i];
    }

    // 3. Atualiza o campo com o valor filtrado e formatado
    input.value = valorFormatado;
}

function mascaraCEP(input) {
    let valorOriginal = input.value;
    let apenasNumeros = "";

    // 1. Filtrar apenas o que é número (comparando caractere por caractere)
    for (let i = 0; i < valorOriginal.length; i++) {
        let caractere = valorOriginal[i];
        // Verifica se o caractere está entre "0" e "9"
        if (caractere >= '0' && caractere <= '9') {
            apenasNumeros += caractere;
        }
    }

    // 2. Montar a máscara manualmente baseada na quantidade de números
    let valorFormatado = "";

    for (let i = 0; i < apenasNumeros.length; i++) {
        if (i === 5) {
            valorFormatado += "-"; // Primeiro ponto
        }
        valorFormatado += apenasNumeros[i];
    }

    // 3. Atualiza o campo com o valor filtrado e formatado
    input.value = valorFormatado;
}
