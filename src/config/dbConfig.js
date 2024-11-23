// Importa o cliente MongoDB para interagir com o banco de dados
import { MongoClient } from 'mongodb';

// Função responsável por estabelecer a conexão com o banco de dados
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  try {
      // Cria uma nova instância do cliente MongoDB usando a string de conexão fornecida
      mongoClient = new MongoClient(stringConexao);

      // Log informando que o processo de conexão foi iniciado
      console.log('Conectando ao cluster do banco de dados...');

      // Tenta conectar ao banco de dados
      await mongoClient.connect();

      // Log informando que a conexão foi bem-sucedida
      console.log('Conectado ao MongoDB Atlas com sucesso!');

      // Retorna o cliente conectado para uso em outras partes da aplicação
      return mongoClient;
  } catch (erro) {
      // Log de erro caso a conexão com o banco falhe
      console.error('Falha na conexão com o banco!', erro);

      // Encerra o processo caso não seja possível conectar ao banco de dados
      process.exit();
  }
}
