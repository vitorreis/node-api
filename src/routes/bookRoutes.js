var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();


    var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);

    //midleware
    bookRouter.use('/:bookId', function(req, res, next){
        Book.findById(req.params.bookId, function(err, book){
            if(err)
                res.status(500).send(err);
            else if (book){
                req.book = book;
                next();
            }
            else
                res.status(404).send('no book found');
        });
    })

    bookRouter.route('/:bookId')
        .get(function(req, res){

            var returnBook = req.book.toJSON();

            returnBook.links = {};
            var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
            returnBook.links.FilterByGenre = encodeURIComponent(newLink);

            res.json(returnBook);
        })
        .put(function(req, res){
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;

            req.book.save(function(err){
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.book);

            });
            res.json(req.book);
        })
        .patch(function(req, res){
            if (req.body._id)
                delete req.body._id;

            for(var p in req.body){
                req.book[p] = req.body[p];
            }

            req.book.save(function(err){
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            });

        })
        .delete(function(req, res){
            req.book.remove(function(err){
                if (err)
                    res.status(500).send(err);
                else
                    res.status(204).send('removed');
            });
        });

    return bookRouter;

}

module.exports = routes;