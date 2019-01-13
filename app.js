// importações
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// inicializar servidor
const app = express();

// dados de conexão com banco
const user = 'starwarsapi';
const password = 'star2019';
const uri = `mongodb://${user}:${password}@ds155774.mlab.com:55774/starwarsapi`;

// realizar conexão com banco
MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db('starwarsapi'); // nome do banco

    // estabelecer comunicação entre servidor e navegador
    app.listen(3000, res => {
        console.log(`Servidor em execução: http://localhost:3000/`);
    });
})

// configurar view engine para o servidor
app.set('view engine', ejs);

// configurar middleware 'bodyParser' para ler dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// requisições ao servidor
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/adicionar', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Planeta inserido no banco de dados!');
        res.redirect('/listar');
    });
});

app.get('/listar', (req, res) => {
    let data = db.collection('data').find(); // obter dados do banco
    data.sort({ _id: -1 }); // ordernar resultados a partir do _id, de forma decrescente
    data.toArray((err, results) => {
        if (err) return console.log(err);
        results = JSON.stringify(results, null, "   ");
        res.render('listar.ejs', { data: results });
    });
});

app.get('/remover', (req, res) => {
    let data = db.collection('data').find(); // obter dados do banco
    data.sort({ _id: -1 }); // ordernar resultados a partir do _id, de forma decrescente
    data.toArray((err, results) => {
        if (err) return console.log(err);
        res.render('remover.ejs', { data: results });
    });
});

app.route('/remover/:id')
    .get((req, res) => {
        var id = req.params.id;
        console.log(id);
        db.collection('data').deleteOne({ _id: Object(id) }, (err, result) => {
            if (err) return console.log(err);
            console.log('Planeta deletado do banco de dados!');
            res.redirect('/listar');

        });
    });