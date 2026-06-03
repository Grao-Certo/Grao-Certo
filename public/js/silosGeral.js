function toggleMenu(element) {
    element.classList.toggle("ativo");
}

let graficoVolume;

function obterDadosDashboard() {
    let idEmpresa = sessionStorage.ID_EMPRESA;

    if (!idEmpresa) {
        console.error("Id da empresa invalido");
        return;
    }

    fetch(`/silo/totalSilos/${idEmpresa}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        kpi_totalSilos.innerHTML = dados[0].total;
                    }
                );
            } else {
                console.error(`Erro ao tentar obter total de silos da emresa`)
            }
        }
    ).catch(
        function (erro) {
            console.error(erro);
        }
    );

    fetch(`/silo/obterDadosGerais/${idEmpresa}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        processarDadosDashboard(dados);
                    }
                );
            } else {
                console.error("Erro ao obter dados da telemetria dos silos");
            }
        }
    ).catch(
        function (erro) {
            console.error(erro);
        }
    );
}

function processarDadosDashboard(dados) {
    let totalMax = 0;
    let totalAtual = 0;

    let listaAvisos = [];
    let coresGrafico = [];
    let labelsGrafico = [];

    let porcentagemGrafico = [];

    container_alertas.innerHTML = "";

    for (let i = 0; i < dados.length; i++) {
        let silo = dados[i];

        let raio = Number(silo.raio);
        let alturaTotal = Number(silo.altura_total);
        let distancia = Number(silo.distancia_superficie);

        let alturaCone = silo.altura_cone ? Number(silo.altura_cone) : 0;

        let volumeTotal = (3.1416 * raio * raio * alturaTotal) + ((1.0 / 3.0) * 3.1416 * raio * raio * alturaCone);

        let diferencaAltura = alturaTotal - distancia;

        if (diferencaAltura < 0) {
            diferencaAltura = 0;
        }

        let volumeAtual = 3.1416 * raio * raio * diferencaAltura;

        totalAtual += volumeAtual;
        totalMax += volumeTotal;

        let porcentagem = volumeTotal > 0 ? (volumeAtual / volumeTotal) * 100 : 0;
        let tipoAviso = "";
        let corBarra = "#324001";
        if (porcentagem > 80) {
            tipoAviso = "vermelho";
            corBarra = "#7f0d0d";

            listaAvisos.push(
                {
                    idSilo: silo.id_silo,
                    fkEmpresa: silo.fk_empresa,
                    porcentagem: porcentagem,
                    tipoAviso: tipoAviso
                }
            );

            container_alertas.innerHTML += `<input type="text" class="silo-input critico" value="Silo ${silo.id_silo}: ${porcentagem.toFixed(1)}% - Risco de superlotação">`;

        } else if (porcentagem < 20) {
            tipoAviso = "amarelo";
            corBarra = "#f1ae00";
            listaAvisos.push(
                {
                    idSilo: silo.id_silo,
                    fkEmpresa: silo.fk_empresa,
                    porcentagem: porcentagem,
                    tipoAviso: tipoAviso
                }
            );

            container_alertas.innerHTML += `<input type="text" class="silo-input atencao" value="Silo ${silo.id_silo}: ${porcentagem.toFixed(1)}% - Nível baixo">`;
        }

        labelsGrafico.push("SILO " + silo.id_silo);
        porcentagemGrafico.push(porcentagem.toFixed(1));
        coresGrafico.push(corBarra);

    }

    kpi_totalArmazenado.innerHTML = `${totalAtual.toFixed(1)}<small>/${totalMax.toFixed(1)}m³</small>`;
    kpi_totalAlertas.innerHTML = listaAvisos.length;

    plotarGrafico(labelsGrafico, porcentagemGrafico, coresGrafico);

}

function plotarGrafico(labels, dados, cores) {

    const ctx1 = document.getElementById('grafico1');

    //destruindo o primeiro grafico para não dar conflito de pré-existencia
    if (graficoVolume) {
        graficoVolume.destroy();
    }

    graficoVolume = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: dados,
                backgroundColor: cores
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    max: 100,
                    min: 0
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label:
                            function (contexto) {
                                return contexto.raw + '%';
                            }
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter:
                        function (valor) {
                            return valor + '%';
                        },
                    font: {
                        weight: 'bold',
                        size: 14
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    setTimeout(() => {
        atualizar();
    }, 5000);

    // setTimeout(() => atualizarGrafico(labels, dados, cores), 2000);
}

function atualizar() {
    obterDadosDashboard();
    processarDadosDashboard();
    plotarGrafico();
}

// let momento = 0;
// function atualizarGrafico(labels, dados, cores) {

//     fetch(`/silo/obterDadosGerais/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (novoRegistro) {

//                 plotarGrafico(labels, dados, cores);
//                 console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

//                 let avisoCaptura = document.getElementById(`avisoCaptura${labels}`)
//                 avisoCaptura.innerHTML = ""

//                 if (momento == dados.labels[dados.labels.length - 1]) {
//                     console.log("---------------------------------------------------------------")
//                     console.log("Como não há dados novos para captura, o gráfico não atualizará.")
//                     avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
//                     console.log("Horário do novo dado capturado:")
//                     console.log(novoRegistro[0].momento_grafico)
//                     console.log("Horário do último dado capturado:")
//                     console.log(dados.labels[dados.labels.length - 1])
//                     console.log("---------------------------------------------------------------")
//                 } else {
//                     // tirando e colocando valores no gráfico
//                     momento++; // incluir um novo momento

//                     cores = novoRegistro.coresGrafico;
//                     labels = novoRegistro.labelsGrafico;
//                     dados = novoRegistro.porcentagemGrafico;
//                 }

//                 // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//                 proximaAtualizacao = setTimeout(() => atualizarGrafico(labels, dados, cores), 2000);
//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//             // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//             proximaAtualizacao = setTimeout(() => atualizarGrafico(labels, dados, cores), 2000);
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

// }