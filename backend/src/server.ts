import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors";
import "./database/connection";
import routes from "./routes";
import errorHandler from "./errors/handler";

//
const app = express();
//usando para permitir o uso da aplicação apartir de outro endereço
app.use(cors());

//usado para que se possa receber json como body
app.use(express.json());
//rotas da aplicação
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);
//porta que a aplicação estara rodando
app.listen(3333);
