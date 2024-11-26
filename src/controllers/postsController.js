// Importa funções do modelo de posts para interagir com o banco de dados
import { getTodosPosts, criarPost, atualizarPost, deletePost} from "../models/postsModels.js";
// Importa o módulo para manipulação de arquivos
import fs from "fs";
// Importa o serviço Gemini para gerar descrições de imagens
import gerarDescricaoComGemini from "../services/geminiService.js";
import { error } from "console";

// Função para listar todos os posts no banco de dados
export async function listarPosts(req, res) {
  // Busca todos os posts no banco e os retorna como resposta
  const posts = await getTodosPosts(); // Pega os posts do MongoDB
  res.status(200).json(posts); // Envia a lista de posts com status 200 (OK)
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
  const novoPost = req.body; // Dados do novo post enviados pelo cliente
  try {
    // Cria o post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Retorna o post criado como resposta
    res.status(200).json(postCriado);
  } catch (error) {
    // Loga o erro e retorna uma resposta com status 500 (Erro do Servidor)
    console.error(error.message);
    res.status(500).json({ "Error": "Falha na requisição" });
  }
}

// Função para fazer upload de uma imagem e criar um post associado
export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "", // Inicialmente vazio, será preenchido depois
    imgUrl: req.file.originalname, // Nome original da imagem enviada
    alt: "" // Campo de texto alternativo também vazio no início
  };
  try {
    // Cria o post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo de imagem enviado para associá-lo ao ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada); // Move e renomeia a imagem
    // Retorna o post criado como resposta
    res.status(200).json(postCriado);
  } catch (error) {
    // Loga o erro e retorna uma resposta com status 500 (Erro do Servidor)
    console.error(error.message);
    res.status(500).json({ "Error": "Falha na requisição" });
  }
}

// Função para atualizar um post com uma nova descrição gerada e informações adicionais
// export async function atualizarNovoPost(req, res) {
//   const id = req.params.id; // ID do post a ser atualizado
//   const urlImagem = `http://localhost:3000/${id}.png`; // URL pública da imagem associada ao post

//   try {
//     // Lê o arquivo de imagem do disco
//     const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
//     // Gera uma descrição para a imagem usando o serviço Gemini
//     const descricao = await gerarDescricaoComGemini(imageBuffer);

//     // Novo objeto do post com a URL da imagem, descrição gerada e texto alternativo
//     const post = {
//       imgUrl: urlImagem,
//       descricao: descricao,
//       alt: req.body.alt // Texto alternativo enviado pelo cliente
//     };

//     // Atualiza o post no banco de dados
//     const postCriado = await atualizarPost(id, post);

//     // Retorna o post atualizado como resposta
//     res.status(200).json(postCriado);
//   } catch (error) {
//     // Loga o erro e retorna uma resposta com status 500 (Erro do Servidor)
//     console.error(error.message);
//     res.status(500).json({ "Error": "Falha na requisição" });
//   }
// }


// Função para atualizar um post com uma nova alt 
export async function atualizarNovoPost(req,res) {
  const id = req.params.id; // ID do post a ser atualizado
  const urlImagem = `http://localhost:3000/${id}.png`;  // URL pública da imagem associada ao post

  try {
    const post = {
      imgUrl: urlImagem,
      alt: req.body.alt, // Texto alternativo enviado pelo cliente
    }

    //  Atualiza o post no banco de dados
    const postAtualizado = await atualizarPost(id, post);
    
    // Retorna o post atualizado como resposta
    res.status(200).json(postAtualizado)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ "Error": "Falha ao atualizar o post" });
  }
}

//// Função para atualizar um post com uma nova descrição
export async function atualizarDescricaoPost(req, res) {
  const id = req.params.id; // ID do post
  const caminhoImagem = `uploads/${id}.png`;

  try {
    // Lê o arquivo de imagem
    const imageBuffer = fs.readFileSync(caminhoImagem);

    // Gera a descrição com o serviço Gemini
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    // Atualiza apenas o campo de descrição no banco de dados
    const postAtualizado = await atualizarPost(id, {descricao});

    res.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ "Error": "Falha ao atualizar descrição" });
  }
}

export async function deletarPost(req, res) {
  const { id } = req.params;

  try {
    // Chama a função do modelo para deletar o post pelo ID
    const resultadoDaDelecao = await deletePost(id);

    // Verifica se o post foi deletado com sucesso
    if (resultadoDaDelecao.deletedCount === 1) {
      res.status(200).json({ message: 'Post deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Post não encontrado' });
    }
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante a operação
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar o post' });
  }
}
