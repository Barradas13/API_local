import express from "express"
import { router } from "./router/router.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});