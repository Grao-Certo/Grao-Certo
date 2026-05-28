function buscarSilos(){
    let id = sessionStorage.ID_USUARIO;

    fetch(`/silo/buscarSilos/${id}`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                             
                            })
                                .then(function (resposta) {
                                    console.log("resposta: ", resposta);
                                    let mensagem = '';
                                    
                                    if(resposta.ok){
                                        resposta.json().then(dados => {       
                                            if(dados.length > 0){
        
                                                console.log("passei no resposta")
                                                
                                                mensagem += `
                                                <li> <a href="dashboardGeral.html" id="active">AVISOS</a> </li>
                                                <!-- <div id="admin"></div> -->
                                                <li> <a href="cadastroSilos.html">CADASTRAR NOVO SILO</a> </li>
                                                <li> <a href="cadastroUsuario.html">CADASTRAR NOVO USUÁRIO</a> </li>
                                                `;
        
                                                for(let i = 0; i < dados.length; i++){
                                                    mensagem += `<li> <a href="dashboardSilo/${dados[i].id}.html">SILO ${i + 1}</a></li>`;
                                                }
        
        
                                                ul_submenu.innerHTML = mensagem;
                                            }else{
                                                mensagem += `
                                                <li> <a href="dashboardGeral.html" id="active">AVISOS</a> </li>
                                                <!-- <div id="admin"></div> -->
                                                <li> <a href="cadastroSilos.html">CADASTRAR NOVO SILO</a> </li>
                                                <li> <a href="cadastroUsuario.html">CADASTRAR NOVO USUÁRIO</a> </li>
                                                `;
        
                                                ul_submenu.innerHTML = mensagem;
                                            }
                                        });
                                    }

                                })
                                .catch(function (resposta) {
                                    console.log(`#ERRO: ${resposta}`);
                                });
}