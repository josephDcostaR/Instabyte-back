import express from 'express';
import routes from './src/routes/postsRoutes.js';


// Importamos o framework Express para criar a nossa aplicação web.
// Importamos a função conectarAoBanco para estabelecer a conexão com o banco de dados MongoDB.


const posts = [
  // ... seus dados de posts
];
// Criamos um array de objetos para representar os posts.
// Este array será usado como um exemplo inicial, mas os dados reais serão obtidos do banco de dados.



const app = express();
app.use(express.static("uploads"))
routes(app)

// Criamos uma instância do Express para iniciar nossa aplicação.


// Ouvi as requisições na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando...");
});
// Iniciamos o servidor e fazemos ele escutar por requisições na porta 3000.
// Quando o servidor inicia, uma mensagem é exibida no console.


// Definimos uma rota GET para o endpoint "/posts".
// Quando uma requisição GET é feita para este endpoint:
//   1. Chamamos a função `getTodosPosts()` para obter todos os posts do banco de dados.
//   2. Enviamos uma resposta com status 200 (sucesso) e os posts no formato JSON.

// ... seus comentários anteriores ...


// //Verifica se id é iqual a id
// function buscarPostPorID(id) {
//   return posts.findIndex((post) =>{
//         return post.id === Number(id)
//   })
// }

// //Rota retorna dados apartir de um id
// app.get("/posts/:id", (req, res) => {
//   const index = buscarPostPorID(req.params.id);
//   res.status(200).json(posts[index]);
// });