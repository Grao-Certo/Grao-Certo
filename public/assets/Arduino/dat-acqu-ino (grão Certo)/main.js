// importa as bibliotecas necessárias
const serialport = require("serialport");
const express = require("express");
const mysql = require("mysql2");

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (valoresDistancia) => {
  // Conexão com o banco - Verifique se a porta 3307 está correta para o seu MySQL!
  let poolBancoDados = mysql
    .createPool({
      host: "localhost",
      user: "aluno",
      password: "Sptech#2024",
      database: "graoCerto",
      port: 3307,
    })
    .promise();

  // Busca o Arduino
  const portas = await serialport.SerialPort.list();
  const portaArduino = portas.find(
    (porta) => porta.vendorId == 2341 && porta.productId == 43,
  );

  if (!portaArduino) {
    console.error(
      "❌ ERRO CRÍTICO: Arduino não detectado. Verifique o cabo USB!",
    );
    return;
  }

  const arduino = new serialport.SerialPort({
    path: portaArduino.path,
    baudRate: SERIAL_BAUD_RATE,
  });

  arduino.on("open", () => {
    console.log(`✅ Conexão Serial aberta em: ${portaArduino.path}`);
  });

  // Escuta os dados do Arduino
  arduino
    .pipe(new serialport.ReadlineParser({ delimiter: "\r\n" }))
    .on("data", async (data) => {
      console.log("📥 Recebido do Arduino: " + data);

      // Converte para número decimal
      const distancia = parseFloat(data.trim());

      // Validação: Se não for um número (NaN), ignora para não quebrar o código
      if (isNaN(distancia)) {
        console.warn(
          "⚠️ Dado inválido recebido (não é um número). Ignorando...",
        );
        return;
      }

      // 1. Guarda na memória RAM para o Front-end (Gráfico)
      valoresDistancia.push(distancia);

      // 2. Tenta salvar no Banco de Dados
      if (HABILITAR_OPERACAO_INSERIR) {
        try {
          console.log("🔥 Tentando inserir:", distancia);
          await poolBancoDados.execute(
            "INSERT INTO telemetria (distancia_superficie, fk_sensor) VALUES (?, ?)",
            [distancia, 1], // exemplo: sensor ID = 1
          );
          console.log(
            `💾 [BANCO] Sucesso: ${distancia} inserido em telemetria.`,
          );
        } catch (error) {
          console.error("❌ [ERRO NO BANCO]: " + error);
          console.log(
            "DICA: Verifique se os nomes da tabela/coluna estão certos e se existem campos obrigatórios vazios!",
          );
        }
      }
    });

  arduino.on("error", (mensagem) => {
    console.error(`❌ Erro na Serial: ${mensagem}`);
  });
};

// função para criar o servidor web (API)
const servidor = (valoresDistancia) => {
  const app = express();

  // Configuração de CORS (Libera acesso para o Front-end)
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept",
    );
    next();
  });

  // Serve the static files from the current directory
  app.use(express.static(__dirname));

  app.listen(SERVIDOR_PORTA, () => {
    console.log(`🚀 API rodando em http://localhost:${SERVIDOR_PORTA}`);
  });

  // Rota para o gráfico buscar os dados
  app.get("/sensores/distancia", (_, response) => {
    return response.json(valoresDistancia);
  });
};

// --- INICIALIZAÇÃO DO SISTEMA ---
(async () => {
  console.log("--- Iniciando Sistema de Telemetria ---");

  const valoresDistancia = [];

  // Inicia a escuta do hardware
  await serial(valoresDistancia);

  // Inicia a entrega dos dados via Web
  servidor(valoresDistancia);
})();
