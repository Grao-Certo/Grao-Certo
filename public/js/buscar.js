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
                            let admin = validarAdmin();

                            if(admin){
                                mensagem += `
                                <li> <a href="dashboardGeral.html" id="active">AVISOS</a> </li>
                                <li> <a href="cadastroSilos.html">CADASTRAR NOVO SILO</a> </li>
                                <li> <a href="cadastroUsuario.html">CADASTRAR NOVO USUÁRIO</a> </li>
                                `;
                            }else{
                                mensagem += `
                                <li> <a href="dashboardGeral.html" id="active">AVISOS</a> </li>
                                `;
                            }

                            for(let i = 0; i < dados.length; i++){
                                mensagem += `<li> <a onclick="acessarSilo(${dados[i].id})"> SILO ${i + 1}</a></li>`;
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