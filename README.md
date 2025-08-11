
# API\_local

## Passo a passo para criar uma API com Node.js

### 1. Inicializar o projeto

```bash
npm init (-y)
```

Inicia um ambiente de projeto com o arquivo `package.json`.

---

### 2. Configurar o `package.json`

Adicione a seguinte linha no `package.json` para usar a sintaxe moderna de módulos (import/export):

```json
"type": "module"
```

---

### 3. Instalar dependências

```bash
npm install express
```

Opcionalmente, para facilitar o desenvolvimento com recarregamento automático:

```bash
npm i --save-dev nodemon
```

No `package.json`, adicione no bloco `"scripts"`:

```json
"dev": "nodemon server.js"
```

---

### 4. Criar estrutura de pastas e arquivos

* Crie a pasta `data` e adicione um arquivo com um array de dados que serão exportados.
* Crie a pasta `controllers` e adicione um arquivo com funções controladoras que acessarão os dados do arquivo JSON.

Exemplo de função no controller (lembrando que os parâmetros são `req` e `res` por conta do protocolo HTTP):

```js
export const getAllDados = (req, res) => {
    console.log("Get all dados chamado");
    res.json(sampleDados);
};
```

---

### 5. Criar rotas

* Crie a pasta `routes` e um arquivo `routes.js`.
* Importe o `Router` do Express, crie uma instância do Router e importe as funções do controller.
* Defina as rotas usando:

```js
rota.get("caminho", função);
```

---

### 6. Criar o servidor

No arquivo principal do projeto (`server.js`):

```js
import express from "express";
import dataRoutes from "./routes/routes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware para interpretar JSON
app.use("/", dataRoutes); // rota da API

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### 7. Usar o CORE

O core serve para "permitir" que a api seja usada, você deve: npm i core
import core from "core" e app.use(core()), tal como está no server.js

### Na pasta public há um exemplo da utilização dessa API
