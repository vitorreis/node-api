var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('Hello from book api, book api rocks!');
});

app.listen(port, function(){
    console.log('running on PORT: ', port);
});