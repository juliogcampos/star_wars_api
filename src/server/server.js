// importações
let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');

// criar uma instância do Express
let app = (module.exports = express()); // exportar variável app

// configurar diretório público para enviar arquivos
app.use(express.static("src/public"));

// configurar template engine
app.set('view engine', ejs);

// configurar caminho da pasta views
app.set('views', 'src/views');

// configurar middleware 'bodyParser' para ler dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

