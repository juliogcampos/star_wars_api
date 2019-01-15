const app = require('./server');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const collection = 'data';

// requisições ao servidor

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/adicionar', (req, res) => {
    db.collection(`${collection}`).insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Planeta inserido no banco de dados!');
        res.redirect('/');
    });
});

app.get('/listar', (req, res) => {
    let data = db.collection(`${collection}`).find(); // obter dados do banco
    data.sort({ _id: -1 }); // ordernar resultados a partir do _id, de forma decrescente
    data.toArray((err, results) => {
        if (err) return console.log(err);
        results = JSON.stringify(results, null, "   ");
        res.render('listar.ejs', { data: results });
    });
});

app.get('/buscar', (req, res) => {
    let data = db.collection(`${collection}`).find(); // obter dados do banco
    data.sort({ _id: -1 }); // ordernar resultados a partir do _id, de forma decrescente
    data.toArray((err, results) => {
        if (err) return console.log(err);
        res.render('buscar.ejs', { data: results });
    });
});

app.post('/buscar/:string', (req, res) => {

    if (req.body.nome) {
        let nome = req.body.nome;
        let data = db.collection(`${collection}`).find({ nome: nome });
        data.toArray((err, result) => {
            if (err) return console.log(err);
            if (result.length > 0) {
                result = JSON.stringify(result, null, "   ");
                res.render('resultado.ejs', { data: result });
            } else {
                res.render('erro.ejs', { data: `${nome}` });
            }
        });
    }

    if (req.body.id) {
        let id = req.body.id;

        if (id.length < 12) { // ObjectId deve ter no mínimo 12 caracteres
            res.render('erro.ejs', { data: `${id}` });
        }

        let data = db.collection(`${collection}`).find({ _id: ObjectId(id) });
        data.toArray((err, result) => {
            if (err) return console.log(err);
            if (result.length > 0) {
                result = JSON.stringify(result, null, "   ");
                res.render('resultado.ejs', { data: result });
            } else {
                res.render('erro.ejs', { data: `${id}` });
            }
        });
    }
});

app.get('/remover', (req, res) => {
    let data = db.collection(`${collection}`).find(); // obter dados do banco
    data.sort({ _id: -1 }); // ordernar resultados a partir do _id, de forma decrescente
    data.toArray((err, results) => {
        if (err) return console.log(err);
        res.render('remover.ejs', { data: results });
    });
});

app.get('/remover/:id', (req, res) => {
    var id = req.params.id;
    db.collection(`${collection}`).deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log(`Planeta '${id}' deletado do banco de dados!`);
        res.redirect('/remover');
    });
});