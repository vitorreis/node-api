var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else{
    db = mongoose.connect('mongodb://localhost/bookAPI');
}


var app = express();

var port = process.env.PORT || 3000;

var Book = require('./models/bookModel');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res){
    res.send('Hello from book api, book api rocks!');
});

app.listen(port, function(){
    console.log('running on PORT: ', port);
});

module.exports = app;