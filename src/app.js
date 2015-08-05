var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var app = express();

var port = process.env.PORT || 3000;

var Book = require('./models/bookModel');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res){
        var query = {};

        if(req.query.genre)
            query.genre = req.query.genre;

        Book.find(query, function(err, books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    })
    .post(function(req, res){
        var book = new Book(req.body);

        console.log(book);
        res.send(book);
    });

bookRouter.route('/Books/:bookId')
    .get(function(req, res){
        Book.findById(req.params.bookId, function(err, book){
            if(err)
                res.status(500).send(err);
            else
                res.json(book);
        });
    });

app.use('/api', bookRouter);

app.get('/', function(req, res){
    res.send('Hello from book api, book api rocks!');
});

app.listen(port, function(){
    console.log('running on PORT: ', port);
});