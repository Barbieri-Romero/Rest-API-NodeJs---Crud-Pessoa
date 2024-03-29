const express = require("express");
const db = require('./infrastructure/database');
const pessoaRoute = require('./routes/pessoaRoutes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sync();
app.use('/pessoas', pessoaRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})