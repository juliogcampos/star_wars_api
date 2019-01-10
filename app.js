// importações
const express = require('express');
const ejs = require('ejs');

// inicializar servidor
const app = express();

// estabelecer comunicação entre servidor e navegador
app.listen(3000, res => {
    console.log(`Servidor em execução: http://localhost:3000/`);
});

// configurar view engine para o servidor
app.set('view engine', ejs);

// requisições ao servidor
app.get('/', (req, res) => {
    res.render('index.ejs');
});
