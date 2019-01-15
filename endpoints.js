const app = require('./server');
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

app.post('/buscar/:nome', (req, res) => {
    let nome = req.body.nome;
    console.log("Buscar planeta", nome);
    let data = db.collection(`${collection}`).find(req.body);
    data.toArray((err, result) => {
        if (err) return console.log(err);
        result = JSON.stringify(result, null, "   ");
        if (!result.nome) {
            res.render('resultado.ejs', { data: `${nome}` });
        } else {
            res.render('resultado.ejs', { data: result });
        }
    });
});

app.post('/buscar/:id', (req, res) => {
    let id = req.body.id;
    console.log("Buscar planeta com id", id);
    let data = db.collection(`${collection}`).find(req.body);
    data.toArray((err, result) => {
        if (err) return console.log(err);
        result = JSON.stringify(result, null, "   ");
        if (result.id == undefined) {
            res.render('resultado.ejs', { data: `${id}` });
        } else {
            res.render('resultado.ejs', { data: result });
        }
    });
});

app.get('/remover', (req, res) => {
    let data = db.collection(`${collection}`).find(); // obter dados do banco
    data.sort({ _id: -1 }); // ordernar resultados a partir do _id, de forma decrescente
    data.toArray((err, results) => {
        if (err) return console.log(err);
        res.render('remover.ejs', { data: results });
    });
});

app.route('/remover/:id')
    .get((req, res) => {
        var id = req.params.id;
        db.collection(`${collection}`).deleteOne({ _id: ObjectId(id) }, (err, result) => {
            if (err) return res.send(500, err);
            console.log(`Planeta '${id}' deletado do banco de dados!`);
            res.redirect('/remover');
        });
    });