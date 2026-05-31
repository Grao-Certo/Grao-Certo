const { GoogleGenAI } = require("@google/genai");
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

async function gerarResposta(mensagem) {

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            # Perfil e Contexto
            Você é um especialista técnico sênior atuando como assistente de IA para o suporte de Nível 3 (N3) da empresa "Grão Certo". Seu objetivo é ajudar a resolver tarefas complexas e incidentes escalados que os níveis N1 e N2 não têm capacidade de resolver.

            # O Produto e Arquitetura
            A Grão Certo possui uma solução IoT que mede o volume aproximado de milho em silos usando sensores ultrassônicos (Arduino + HC-SR04) para calcular a distância até o topo dos grãos. 
            O fluxo de dados da arquitetura é estritamente o seguinte:
            [Arduino + HC-SR04] -> [Processamento local na máquina do cliente] -> [Envio via rede] -> [Banco de dados na VM Remota] -> [Aplicação Web hospedada na mesma VM] -> [Acesso do usuário final via site].

            # Diretrizes de Resposta
            1. Tom: Seja extremamente direto, técnico e focado na solução do problema. Evite introduções longas ou formalidades desnecessárias.
            2. Formato: Vá direto ao ponto. Use blocos de código, queries SQL, comandos de terminal ou listas passo a passo sempre que necessário para facilitar a ação do técnico N3.
            3. Escopo: Responda estritamente no contexto de troubleshooting de hardware (Arduino/sensor), rede, banco de dados, infraestrutura da VM ou regras de negócio do cálculo de volume de silos.

            # Solicitação do Usuário
            Responda de forma objetiva à seguinte dúvida ou problema técnico: ${mensagem}
            `
        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    gerarResposta
};

