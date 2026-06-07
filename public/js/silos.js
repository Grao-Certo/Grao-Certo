buscarSilos();

let chartGauge;
let chartMensal;
let chartSemanal;
let chartFechamento;

function calcularArea(raio) {
    return 3.1416 * raio * raio;
}

function carregarDadosSilo() {
    let idSilo = sessionStorage.ID_SILO_ATUAL;

    if (!idSilo) {
        alert(`Erro: Nenhum silo foi selecionado.`);
        window.location.href = "dashboardGeral.html";
        return;
    }

    console.log(`Página carregada. Carregando dados do silo: ${idSilo}`);
    obterMedidas(idSilo);
    obterVolumeMensal(idSilo);
    obterMovimentacaoSemanal(idSilo);
    obterFechamentoDiario(idSilo);

    setInterval(function () {
        obterMedidas(idSilo);
    }, 2000);
}

function toggleMenu(element) {
    element.classList.toggle("ativo");
}

function calcularValorEstoque() {
    let strEstoque = ipt_estoqueAtual.value.replaceAll(',', '.');
    let strValorTonelada = ipt_valorTonelada.value.replaceAll(',', '.');

    let estoque = Number(strEstoque);
    let valorTonelada = Number(strValorTonelada);

    let total = estoque * valorTonelada;

    total = total.toFixed(2).replaceAll('.', ',')

    ipt_valorTotal.value = "R$ " + total;
}

const ctx2 = document.getElementById('grafico2');
const ctx3 = document.getElementById('grafico3');
const ctx4 = document.getElementById('grafico4');
const ctx6 = document.getElementById('grafico6');

// GRÁFICO 2: Estoque Semanal 
chartFechamento = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            datasets: [{
                label: 'Quantidade de toneladas',
                data: [60, 85, 70, 90, 75, 80, 65],
                borderColor: '#94A69A',
                backgroundColor: 'rgba(139, 195, 74, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#94A69A',
                pointRadius: 4,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    ticks: { stepSize: 20 }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { usePointStyle: true, pointStyle: 'circle' }
                },
                annotation: {
                    annotations: {
                        linhaCheia: {
                            type: 'line',
                            yMin: 80,
                            yMax: 80,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [6, 4],
                            label: {
                                display: true,
                                content: 'Cheio (80 TON)',
                                position: 'start',        
                                yAdjust: -14,            
                                backgroundColor: 'transparent',
                                color: 'red',
                                font: { size: 11 }
                            }
                        },
                        linhaVazia: {
                            type: 'line',
                            yMin: 20,
                            yMax: 20,
                            borderColor: '#f0c000',
                            borderWidth: 2,
                            borderDash: [6, 4],
                            label: {
                                display: true,
                                content: 'Vazio (20 TON)',
                                position: 'start',        
                                yAdjust: -14,             
                                backgroundColor: 'transparent',
                                color: '#f0c000',
                                font: { size: 11 }
                            }
                        }
                    }
                }
            }
        }
});

// GRÁFICO 3: Volume Atual  
let capacidadeMax = 100;
let volumeAtual = 72.5;
let porcentagem = (volumeAtual / capacidadeMax) * 100;

let pluginTextoCentro = {
    id: 'textoCentro',
    afterDraw: function (chart) {
        let ctx = chart.ctx;
        let chartArea = chart.chartArea;
        let x = (chartArea.left + chartArea.right) / 2;
        let y = (chartArea.top + chartArea.bottom) / 1.15;

        ctx.save();
        ctx.textAlign = 'center';

        ctx.font = 'bold 22px DM Sans, Arial';
        ctx.fillStyle = '#333';

        /* exibição da porcentagem
        let pct = chart.data.datasets[0].data[0];
        ctx.fillText(pct.toFixed(1) + '%', x, y);
        */

        ctx.fillText(volumeAtual.toFixed(1) + ' TON', x, y);

        ctx.restore();
    }
};

let corInicial = '#003E04';
let corFundoInicial = '#cdf8cd';

if (porcentagem <= 20) {
    corInicial = '#f1ae00';
    corFundoInicial = '#fcf3cf';
} else if (porcentagem >= 80) {
    corInicial = '#c0392b';
    corFundoInicial = '#fadbd8';
}

chartGauge = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        datasets: [
            {
            data: [porcentagem, 100 - porcentagem],
            backgroundColor: [corInicial, corFundoInicial],
            borderWidth: 0
            }
        ]
    },
    options: {
        rotation: -90,
        circumference: 180,
        cutout: '70%',
        plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            responsive: true,
            maintainAspectRatio: false
        },
        plugins: [pluginTextoCentro]
    });

// GRÁFICO 4: Entrada e Saída Total Semanal 
chartSemanal = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Entrada',
                data: [],
                backgroundColor: '#003E04',
                borderRadius: 3
            },
            {
                label: 'Saída',
                data: [],
                backgroundColor: '#c0392b',
                borderRadius: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                grid: { display: false }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        }
    }
});

// GRÁFICO 6: Registro Volume Total Mensal 
chartMensal = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
            datasets: [
                {
                    label: '2026',
                    data: [80, 75, 70, 65, 72, 68, 80, 0, 0, 0, 0, 0],
                    backgroundColor: '#003E04',
                    borderRadius: 3
                },
                {
                    label: '2025',
                    data: [78, 72, 68, 60, 65, 70, 75, 0, 0, 0, 0, 0],
                    backgroundColor: '#A2DB8F',
                    borderRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20 }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { usePointStyle: true, pointStyle: 'circle' }
                },
                annotation: {
                    annotations: {
                        linhaMeta: {
                            type: 'line',
                            yMin: 60,
                            yMax: 60,
                            borderColor: 'blake',
                            borderWidth: 2,
                            borderDash: [6, 4],
                            label: {
                                display: true,
                                content: 'Meta (60 TON)',
                                position: 'end',
                                backgroundColor: 'blake',
                                color: 'white',
                                font: { size: 11 }
                            }
                        }
                    }
                }
            }
        }
    }
);

function obterMedidas(idSilo) {
    fetch(`/silo/buscarMedidaMaisRecente/${idSilo}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        if (dados.length > 0) {
                            let registro = dados[0];
                            let raio = Number(registro.raio);
                            let alturaTotal = Number(registro.alturaTotal);
                            let distancia = Number(registro.distanciaSuperficie);
                                                
                            let alturaCone = 0;
                            if (registro.alturaCone) {
                                alturaCone = Number(registro.alturaCone);
                            }
                        
                            let densidadeGrao = 0.75;
                            let volumeTotal = ((calcularArea(raio) * alturaTotal) + ((1.0 / 3.0) * calcularArea(raio) * alturaCone)) * densidadeGrao;
                            let diferencaAltura = alturaTotal - distancia;

                            if (diferencaAltura < 0) {
                                diferencaAltura = 0;
                            }
                        
                            volumeAtual = calcularArea(raio) * diferencaAltura * densidadeGrao;
                            capacidadeMax = volumeTotal;
                        
                            let porcentagem = 0;

                            if (capacidadeMax > 0) {
                                porcentagem = (volumeAtual / capacidadeMax) * 100;
                            }
                        
                            chartGauge.data.datasets[0].data = [porcentagem, 100 - porcentagem];

                            let corPreenchimento = '#003E04';
                            let corFundo = '#cdf8cd';

                            if (porcentagem <= 20) {
                                corPreenchimento = '#f1ae00';
                                corFundo = '#fcf3cf';
                            } else if (porcentagem >= 80) {
                                corPreenchimento = '#c0392b';
                                corFundo = '#fadbd8';
                            }

                            chartGauge.data.datasets[0].backgroundColor = [corPreenchimento, corFundo];

                            chartGauge.update();
                        
                            ipt_estoqueAtual.value = volumeAtual.toFixed(1).replace('.', ',');
                            ipt_valorAtualizado.value = registro.dataHoraFormatada;
                            ipt_dataFechamento.value = registro.dataHoraFechamento;

                            //realizando comparação e alteração de cor do grafico com base no geristro anterior
                                if (dados.length > 1) {
                                    let registroAnterior = dados[1];
                                    let distanciaAnterior = Number(registroAnterior.distanciaSuperficie);
                                    let diferencaAnterior = alturaTotal - distanciaAnterior;

                                    if (diferencaAnterior < 0) {
                                        diferencaAnterior = 0;
                                    }

                                    let volumeAnterior = calcularArea(raio) * diferencaAnterior * densidadeGrao;

                                    if (volumeAtual > volumeAnterior) {
                                        div_kpi_movimentacao.innerHTML = "entrada";
                                        div_kpi_movimentacao.style.color = "#003E04";
                                        ipt_valorAtualizado.style.backgroundColor = "#003E04";
                                    } else if (volumeAtual < volumeAnterior) {
                                        div_kpi_movimentacao.innerHTML = "saida";
                                        div_kpi_movimentacao.style.color = "#c0392b";
                                        ipt_valorAtualizado.style.backgroundColor = "#c0392b";
                                    } else {
                                        div_kpi_movimentacao.innerHTML = "sem alterações";
                                        ipt_valorAtualizado.style.backgroundColor = "#003E04";
                                    }
                                } else {
                                    div_kpi_movimentacao.innerHTML = "";
                                    ipt_valorAtualizado.style.backgroundColor = "#003E04";
                                }
                        
                            calcularValorEstoque();
                        }   
                    }
                );
            } else {
                console.error("Erro ao obter medidas mais recentes.");
            }
        }
    ).catch(
        function (erro) {
            console.error(erro);
        }
    );
}

function obterVolumeMensal(idSilo) {
    fetch(`/silo/buscarVolumeMensal/${idSilo}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        let dados2026 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        let dados2025 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                        let volumeTotal = 0;
                        
                        if (dados.length > 0) {
                            let alturaCone = 0;

                            let raio = Number(dados[0].raio);
                            let alturaTotal = Number(dados[0].alturaTotal);

                            if (dados[0].alturaCone) {
                                alturaCone = Number(dados[0].alturaCone);
                            }

                            volumeTotal = ((calcularArea(raio) * alturaTotal) + ((1.0 / 3.0) * calcularArea(raio) * alturaCone)) * 0.75;
                        }

                        for (let i = 0; i < dados.length; i++) {
                            let registro = dados[i];
                            let mes = registro.mes;
                            let ano = registro.ano;
                            let maxVolume = Number(registro.max_volume);

                            if (ano === 2026) {
                                dados2026[mes - 1] = maxVolume;
                            } else if (ano === 2025) {
                                dados2025[mes - 1] = maxVolume;
                            }
                        }

                        chartMensal.data.datasets[0].data = dados2026;
                        chartMensal.data.datasets[1].data = dados2025;

                        if (volumeTotal > 0) {
                            let valorMeta = volumeTotal * 0.4;
                            chartMensal.options.scales.y.max = Math.ceil(volumeTotal);

                            chartMensal.options.plugins.annotation.annotations.linhaMeta.yMin = valorMeta;
                            chartMensal.options.plugins.annotation.annotations.linhaMeta.yMax = valorMeta;
                            chartMensal.options.plugins.annotation.annotations.linhaMeta.label.content = `Meta (${valorMeta.toFixed(1)} TON)`;
                        }
                        chartMensal.update();
                    }
                );
            } else {
                console.error("Erro ao obter dados de volume mensal.");
            }
        }
    ).catch(
        function (erro) {
            console.error(erro);
        }
    );
}

function obterFechamentoDiario(idSilo){
     fetch(`/silo/buscarOscilacaoDiaria/${idSilo}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                        function (dados) {
                        
                        let diasSemana = [];
                        let fechamentoDiario = []
                        let volumeTotal = 0

                        if (dados.length > 0) {
                            for(let i = dados.length - 1; i >= 0; i--){
                                diasSemana.push(dados[i].dia_semana);
                                fechamentoDiario.push(dados[i].fechamento_diario); 
                            }

                            volumeTotal = dados[0].volume_total;
                        }
                        console.log(fechamentoDiario);
                        console.log(diasSemana);

                        let cheio = (volumeTotal * 0.80);
                        let vazio = (volumeTotal * 0.20);
                       
                        chartFechamento.data.labels = diasSemana;
                        chartFechamento.data.datasets[0].data = fechamentoDiario;
                        chartFechamento.options.scales.y.max = volumeTotal;
                        chartFechamento.options.plugins.annotation.annotations.linhaCheia.yMax = cheio;
                        chartFechamento.options.plugins.annotation.annotations.linhaCheia.yMin = cheio;
                        chartFechamento.options.plugins.annotation.annotations.linhaCheia.label.content = `Cheio (80%)`;
                        chartFechamento.options.plugins.annotation.annotations.linhaVazia.yMax = vazio;
                        chartFechamento.options.plugins.annotation.annotations.linhaVazia.yMin = vazio;
                        chartFechamento.options.plugins.annotation.annotations.linhaVazia.label.content = `Vazio (20%)`;


                       
                        chartFechamento.update();
                    }
                );
            } else {
                console.error("Erro ao obter dados do fechamento diario.");
            }
        }
    ).catch(
        function (erro) {
            console.error(erro);
        }
    );
}

function obterMovimentacaoSemanal(idSilo) {
    fetch(`/silo/buscarMovimentacaoSemanal/${idSilo}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        let labels = [];
                        let entradas = [];
                        let saidas = [];

                        for (let i = 0; i < dados.length; i++) {
                            let registro = dados[i];
                            labels.push(registro.dia_mes);
                            entradas.push(Number(registro.total_entrada));
                            saidas.push(Number(registro.total_saida));
                        }

                        chartSemanal.data.labels = labels;
                        chartSemanal.data.datasets[0].data = entradas;
                        chartSemanal.data.datasets[1].data = saidas;

                        chartSemanal.update();
                    }
                );
            } else {
                console.error("Erro ao obter movimentação semanal.");
            }
        }
    ).catch(
        function (erro) {
            console.error(erro);
        }
    );
}