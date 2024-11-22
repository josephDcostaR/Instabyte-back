import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem,atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors"

const corOptions = {
  origin: "http://localhost:8000",
  optionSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads" , storage})
//Configura o armaenamento de arquivos para windows
//Em outros sistemas é feito de forma diferente

const routes = (app) => {

  app.use(express.json());
  app.use(cors(corOptions))
  // Utilizamos o middleware `express.json()` para permitir que a aplicação receba dados no formato JSON nas requisições.
  // Rota get acessa ou sobe algo na rede
  app.get("/posts", listarPosts);
  app.post("/posts", postarNovoPost)
  app.post("/upload", upload.single("imagem"), uploadImagem)
  app.put("/upload/:id", atualizarNovoPost)

}

export default routes;

