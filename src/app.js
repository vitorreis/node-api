var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res){
        var response = {
            title: 'hello from api'
        };

        res.json(response);
    });

app.use('/api', bookRouter);

app.get('/', function(req, res){
    res.send('Hello from book api, book api rocks!');
});

app.listen(port, function(){
    console.log('running on PORT: ', port);
});