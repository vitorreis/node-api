var bookController = function(Book){
    var getAll = function(req, res){
        var query = {};

        if(req.query.genre)
            query.genre = req.query.genre;

        Book.find(query, function(err, books){
            if(err)
                res.status(500).send(err);
            else{
                var returnBooks = [];

                books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;

                    returnBooks.push(newBook);
                })
                res.json(returnBooks);
            }
        });
    };

    var create = function(req, res){
        var book = new Book(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }else{
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    return {
        get: getAll,
        post: create
    }
}

module.exports = bookController;