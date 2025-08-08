import express from "express"
import { router } from "./router/router.js";

const app = express();
const PORT = 3000;

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});