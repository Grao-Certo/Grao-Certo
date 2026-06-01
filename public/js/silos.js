buscarSilos();

function carregarDadosSilo() {
    let idSilo = sessionStorage.getItem("ID_SILO_ATUAL");

    if (!idSilo) {
        alert(`Erro: Nenhum silo foi selecionado.`);
        window.location.href = "dashboardGeral.html";
        return;
    }

    console.log(`Página carregada. Carregando dados do silo: ${idSilo}`);
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
        datasets: [
            {
            label: 'Quantidade de toneladas',
            data: [60, 85, 70, 90, 75, 80, 65],
            borderColor: '#8BC34A',
            backgroundColor: 'rgba(139, 195, 74, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: '#8BC34A',
            pointRadius: 4,
            tension: 0.4,
            fill: true
            }
        ]
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

new Chart(ctx3, {
    type: 'doughnut',
    data: {
        datasets: [
            {
            data: [porcentagem, 100 - porcentagem],
            backgroundColor: ['#324001', '#8BC34A'],
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
                backgroundColor: '#8BC34A',
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
new Chart(ctx6, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        datasets: [
            {
                label: '2026',
                data: [80, 75, 70, 65, 72, 68, 80, 0, 0, 0, 0, 0],
                backgroundColor: '#324001',
                borderRadius: 3
            },
            {
                label: '2025',
                data: [78, 72, 68, 60, 65, 70, 75, 0, 0, 0, 0, 0],
                backgroundColor: '#8BC34A',
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