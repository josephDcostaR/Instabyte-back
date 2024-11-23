// Importa a biblioteca Google Generative AI para usar o modelo generativo Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma instância do cliente da API do Gemini usando a chave de API fornecida no arquivo .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo generativo "gemini-1.5-flash" para gerar conteúdo
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função para gerar uma descrição (alt-text) de uma imagem usando o Gemini
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Prompt que será enviado ao modelo para gerar uma descrição em português
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // Configura a imagem a ser analisada, convertendo o buffer em base64
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte o buffer da imagem para base64
        mimeType: "image/png", // Define o tipo MIME da imagem como PNG
      },
    };

    // Envia o prompt e a imagem ao modelo para geração de conteúdo
    const res = await model.generateContent([prompt, image]);

    // Retorna o texto gerado ou uma mensagem padrão caso o texto não esteja disponível
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Loga o erro em caso de falha na geração do alt-text
    console.error("Erro ao obter alt-text:", erro.message, erro);
    // Lança um erro para ser tratado pela função chamadora
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
