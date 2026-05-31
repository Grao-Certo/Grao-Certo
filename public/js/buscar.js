function buscarSilos(){
    let id = sessionStorage.ID_USUARIO;

    fetch(`/silo/buscarSilos/${id}`,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },

        }).then(
            function (resposta) {
                console.log("resposta: ", resposta);
                let mensagem = '';
                                    
                if(resposta.ok){
                    resposta.json().then(dados => {       
                        if(dados.length > 0){
                            //buscando a página atual + o id do silo
                            let paginaAtual = window.location.pathname;
                            let siloAtual = sessionStorage.getItem("ID_SILO_ATUAL");

                            //validando se a página atual é a dashboard geral, caso seja limpa a tag active ou coloca ela
                            let ativoAvisos = paginaAtual.includes("dashboardGeral.html") ? 'id="active"' : '';
                            let admin = validarAdmin();

                            if(admin){
                                mensagem += `
                                <li> <a href="dashboardGeral.html" ${ativoAvisos}>AVISOS</a> </li>
                                <li> <a href="cadastroSilos.html">CADASTRAR NOVO SILO</a> </li>
                                <li> <a href="cadastroUsuario.html">CADASTRAR NOVO USUÁRIO</a> </li>
                                `;
                            }else{
                                mensagem += `
                                <li> <a href="dashboardGeral.html" ${ativoAvisos}>AVISOS</a> </li>
                                `;
                            }

                            for(let i = 0; i < dados.length; i++){
                                let ativoSilo = '';

                                // Se estiver na dashboardSilos e o ID do silo atual for igual, deixa verde
                                if (paginaAtual.includes("dashboardSilos.html") && dados[i].id == siloAtual) {
                                    ativoSilo = 'id="active"';
                                }

                                mensagem += `<li> <a onclick="acessarSilo(${dados[i].id})" ${ativoSilo}> SILO ${i + 1}</a></li>`;

                            }
                            ul_submenu.innerHTML = mensagem;
                        }else{
                            mensagem += `
                            <li> <a href="dashboardGeral.html" id="active">AVISOS</a> </li>
                            `;
                            ul_submenu.innerHTML = mensagem;
                        }
                    });
                }
            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            }
        );
}

function acessarSilo(idSilo) {
    sessionStorage.setItem("ID_SILO_ATUAL", idSilo);
    
    window.location.href = "dashboardSilos.html";
}