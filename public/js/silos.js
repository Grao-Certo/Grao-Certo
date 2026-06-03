buscarSilos();

let chartGauge;
let chartMensal;

function carregarDadosSilo() {
    let idSilo = sessionStorage.getItem("ID_SILO_ATUAL");

    if (!idSilo) {
        alert(`Erro: Nenhum silo foi selecionado.`);
        window.location.href = "dashboardGeral.html";
        return;
    }

    console.log(`Página carregada. Carregando dados do silo: ${idSilo}`);
    obterMedidas(idSilo);
    obterVolumeMensal(idSilo);
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
new Chart(ctx2, {
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
        ctx.fillText(volumeAtual.toFixed(1) + ' TON', x, y);

        ctx.restore();
    }
};

chartGauge = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        datasets: [
            {
            data: [porcentagem, 100 - porcentagem],
            backgroundColor: ['#003E04', '#cdf8cd'],
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
new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        datasets: [
            {
                label: 'Entrada',
                data: [0, 10, 5, 0, 10, 30, 40],
                backgroundColor: '#003E04',
                borderRadius: 3
            },
            {
                label: 'Saída',
                data: [0, 12, 10, 0, 5, 10, 48],
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
                beginAtZero: true,
                max: 50,
                ticks: { stepSize: 10 }
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
                        
                            //talvez a yasmin e o veneroso estejam certos sobre deixar isso no select
                            let volumeTotal = (3.1416 * raio * raio * alturaTotal) + ((1.0 / 3.0) * 3.1416 * raio * raio * alturaCone);
                            let diferencaAltura = alturaTotal - distancia;

                            if (diferencaAltura < 0) {
                                diferencaAltura = 0;
                            }
                        
                            volumeAtual = 3.1416 * raio * raio * diferencaAltura;
                            capacidadeMax = volumeTotal;
                        
                            let porcentagem = 0;

                            if (capacidadeMax > 0) {
                                porcentagem = (volumeAtual / capacidadeMax) * 100;
                            }
                        
                            chartGauge.data.datasets[0].data = [porcentagem, 100 - porcentagem];

                            //atualiza o grafico já existente
                            chartGauge.update();
                        
                            ipt_estoqueAtual.value = volumeAtual.toFixed(1).replace('.', ',');
                            ipt_valorAtualizado.value = registro.dataHoraFormatada;
                        
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

                        // PUTA QUE PARIU QUE CALCULO CHATO DE FAZER NUM DAVA PRA FAZER A MERDA DO SILO SER QUADRADO????
                        if (dados.length > 0) {
                            let alturaCone = 0;

                            let raio = Number(dados[0].raio);
                            let alturaTotal = Number(dados[0].alturaTotal);

                            if (dados[0].alturaCone) {
                                alturaCone = Number(dados[0].alturaCone);
                            }

                            volumeTotal = (3.1416 * raio * raio * alturaTotal) + ((1.0 / 3.0) * 3.1416 * raio * raio * alturaCone);
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

                            //CONTEMPLE O FAMOSO "CAVAR NA PORRA DAS INVOCAÇÕES"
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