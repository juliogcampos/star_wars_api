// importações
let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');

// criar uma instância do Express
let app = (module.exports = express()); // exportar variável app

// configurar template engine
app.set('view engine', ejs);

// configurar middleware 'bodyParser' para ler dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

