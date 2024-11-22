import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Estabelecemos a conexão com o banco de dados MongoDB usando a string de conexão obtida do ambiente.
// O resultado da conexão é armazenado na variável 'conexao'.

// Conecta com o db do mongo
export async function getTodosPosts() {
  const db = conexao.db("imersao-instabytes");
  // Acessamos o banco de dados específico chamado "imersao-instabytes" dentro da conexão estabelecida.
  const colecao = db.collection("posts");
  // Acessamos a coleção de documentos chamada "posts" dentro do banco de dados.
  return colecao.find().toArray();
  // Realizamos uma consulta para encontrar todos os documentos (posts) na coleção e retornamos os resultados como um array.
}

export async function  criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}


export async function  atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
