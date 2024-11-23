import express from 'express'; // Importa o framework Express para criar e gerenciar a aplicação web
import routes from './src/routes/postsRoutes.js'; // Importa as rotas configuradas para os endpoints relacionados aos posts

// Criamos um array de posts para uso inicial (exemplo ou teste), mas os dados reais vêm do banco de dados.
const posts = [
  // ... dados de posts (se necessário, podem ser utilizados para teste ou como mock)
];

const app = express(); // Inicializa uma nova instância do Express

app.use(express.static("uploads")); 
// Configura o diretório "uploads" para servir arquivos estáticos, como imagens armazenadas.

routes(app); 
// Aplica as rotas definidas em `postsRoutes.js` na aplicação Express

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando está pronto
app.listen(3000, () => {
  console.log("Servidor escutando..."); // Indica que o servidor está rodando
});
