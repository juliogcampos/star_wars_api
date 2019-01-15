// importações
const app = require('./server');
const endpoints = require('./endpoints');
const MongoClient = require('mongodb').MongoClient;

// dados de conexão com banco
const db_name = 'starwarsapi'
const collection = 'data';
const user = 'starwarsapi';
const password = 'star2019';
const uri = `mongodb://${user}:${password}@ds155774.mlab.com:55774/starwarsapi`;

// realizar conexão com banco
MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db(`${db_name}`);

    // estabelecer comunicação entre servidor e navegador
    app.listen(3000, (req, res) => {
        console.log(`Servidor em execução: http://localhost:3000/`);
    });
})
