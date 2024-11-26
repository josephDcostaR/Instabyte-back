import 'dotenv/config'; // Carrega as variáveis de ambiente do arquivo .env
import { ObjectId } from "mongodb"; // Importa o ObjectId para manipular IDs do MongoDB
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função de conexão com o banco de dados

// Estabelece conexão com o MongoDB usando a string de conexão definida no arquivo .env
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para buscar todos os posts no banco de dados
export async function getTodosPosts() {
  const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes"
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco
  return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
}

// Função para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes"
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco
  return colecao.insertOne(novoPost); // Insere o novo post na coleção e retorna o resultado
}

// Função para atualizar um post existente no banco de dados
export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes"
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco
  const objID = ObjectId.createFromHexString(id); // Converte o ID fornecido em um ObjectId válido
  return colecao.updateOne(
    { _id: new ObjectId(objID) }, // Busca o documento pelo ID
    { $set: novoPost } // Atualiza os campos do documento com os dados fornecidos
  );
}

// Função para deletar um post existente no banco de dados
export async function deletePost(id) {
  const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes"
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco
  const objID = ObjectId.createFromHexString(id); // Converte o ID fornecido em um ObjectId válido
  return colecao.deleteOne(
    { _id: new ObjectId(objID) } // Busca o documento pelo ID
     // deleta os campos do documento com os dados fornecidos
  );
}
