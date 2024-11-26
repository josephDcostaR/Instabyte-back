# Backend de Postagens - Estilo Instagram

Este é um backend desenvolvido em **JavaScript** e **Node.js** que gerencia postagens no estilo do Instagram. Ele permite criar, editar, atualizar, deletar postagens e realizar upload de imagens. Um diferencial do projeto é o uso da API **Gemini** para gerar descrições automáticas das imagens.

O comumo da api pode ser feito atravez do postman ou outros.

## 🚀 Funcionalidades

- **Criar Postagens**: Salve novas postagens com texto e imagens.
- **Editar Postagens**: Modifique postagens existentes.
- **Deletar Postagens**: Remova postagens do banco de dados.
- **Upload de Imagens**: Envie e armazene imagens associadas às postagens.
- **Descrição Automática**: Use a API Gemini para gerar descrições inteligentes de imagens.

## 🛠️ Tecnologias e Dependências

Este projeto utiliza as seguintes tecnologias e bibliotecas:

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
- [Express](https://expressjs.com/) - Framework para APIs.
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL.
- [Multer](https://www.npmjs.com/package/multer) - Upload de arquivos.
- [dotenv](https://www.npmjs.com/package/dotenv) - Gerenciamento de variáveis de ambiente.
- [CORS](https://www.npmjs.com/package/cors) - Controle de acesso.
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) - Integração com a API Gemini para descrições de imagens.

## 📦 Pré-requisitos

Certifique-se de ter as versões mínimas abaixo instaladas:

- **Node.js**: >= 14.0.0
- **npm**: >= 6.0.0
- Conta na Google Cloud com chave de API para acessar o **Gemini**.

## 📝 Instalação

## 1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

## 2. Instale as dependências:
  ```bash
  npm install
  ```

## 3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as configurações necessárias:
  ```bash
    GEMINI_API_KEY=SEU_TOKEN_DA_API
    MONGO_URI=STRING_DE_CONEXAO_DO_MONGODB
    PORT=3000
  ```

## 4. Inicie o servidor:
  ```bash
    npm run dev
  ```
O servidor será iniciado em: http://localhost:3000


### 🖼️ Uso da API
## Endpoints principais:
## 1. Criar Postagem
- POST /posts
- Corpo da requisição:
```json
{
  "titulo": "Título da postagem",
  "descricao": "Descrição opcional",
  "imagem": "<arquivo>"
}
```

## 2. Listar Postagens
- GET /posts

## 3. Upload Imagens
- POST / /upload
Use o postman ou outros para dar upload na imagem

## 4. Atualizar Postagem (geral)
- PUT /updatePost/:id
Esse endpoint atualiza o alt da imagem

## 5. Gerar Descrição Automática
-PUT /updateDescricao/:id/descricao
- Este endpoint recebi o id da imagem e devolve uma descrição da imagem.

## 6. Deletar Postagem
- DELETE /postagens/:id

## 🌟 Diferencial
O projeto usa a API Gemini para analisar imagens e gerar descrições automáticas (alt-text), otimizando a acessibilidade e enriquecendo as postagens.

## 📄 Licença
Este projeto é licenciado sob a AGPL-3.

## 👥 Contribuidores
Sinta-se à vontade para contribuir com o projeto! Envie um Pull Request ou abra uma Issue.