function toggleMenu(element) {
    element.classList.toggle("ativo");
}

const ctx1 = document.getElementById('grafico1');

new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['SILO 1', 'SILO 2', 'SILO 3'],
        datasets: [
            {
            data: [95, 10, 62],
            backgroundColor: ['#7f0d0d', '#f1ae00', '#324001']
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw + '%';
                    }
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: function (value) {
                    return value + '%';
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

let graficoVolume;

function obterDadosDashboard() {
    let idEmpresa = sessionStorage.ID_EMPRESA;

    if(!idEmpresa){
        console.error("Id da empresa invalido");
        return;
    }

    fetch(`/silo/totalSilos/${idEmpresa}`).then(
        function (resposta) {
            if(resposta.ok) {
                resposta.json().then(
                    function(dados){
                        kpi_totalSilos.innerHTML = dados[0].total;
                    }
                );
            } else {
                console.error(`Erro ao tentar obter total de silos da emresa`)
            }
        }
    ).catch(
        function(erro){
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
}