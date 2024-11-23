import express from "express"; // Importa o framework Express para criar rotas e gerenciar a aplicação
import multer from "multer"; // Importa o Multer para gerenciar uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções do controller de posts
import cors from "cors"; // Importa o middleware CORS para gerenciar políticas de acesso entre domínios

// Configurações do CORS para permitir requisições apenas do endereço especificado
const corOptions = {
  origin: "http://localhost:8000", // Permite requisições apenas dessa origem
  optionSuccessStatus: 200 // Define o status de sucesso para requisições pré-voo (CORS)
};

// Configuração de armazenamento para o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino dos arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Salva os arquivos no diretório 'uploads/'
  },
  // Define o nome do arquivo enviado, mantendo o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Configura o middleware Multer com o destino de uploads e o armazenamento definido acima
const upload = multer({ dest: "./uploads", storage });
// Configurações específicas para armazenamento de arquivos, adaptadas ao sistema operacional

// Define as rotas para a aplicação
const routes = (app) => {
  // Middleware para habilitar o recebimento de dados em formato JSON nas requisições
  app.use(express.json());
  // Middleware para habilitar CORS usando as configurações definidas
  app.use(cors(corOptions));

  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para fazer upload de uma imagem e criar um post associado
  app.post("/upload", upload.single("imagem"), uploadImagem);

  // Rota PUT para atualizar um post existente com base no ID
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta as rotas para serem usadas na aplicação principal
