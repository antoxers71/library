const express = require('express');

class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
    ) {
        this.id = Object.values(bookStore).length;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

const bookStore = {};

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/api/user/login', (req, res) => {
    const result = { id: 1, mail: "test@mail.ru" };
    res.status(201);
    res.json(result);
});

app.get('/api/books', (req, res) => {
    const listBook = Object.values(bookStore);
    res.json(listBook);
})

app.get('/api/books/:id', (req, res) => {
    const {id} = req.params;

    if(bookStore[id]) {
        res.json(bookStore[id])
    } else {
        res.status(404)
        res.json('Книга не найдена')
    }
});

app.post('/api/books/', (req, res) => {
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const newBook = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    );
    bookStore[newBook.id] = newBook;

    res.status(201)
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const {id} = req.params;

    if (bookStore[id]) {
        bookStore[id] = Object.assign(bookStore[id], req.body);
        res.json(bookStore[id])
    } else {
        res.status(404);
        res.json('Книга не найдена');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {id} = req.params

    if (bookStore[id]){
        delete bookStore[id];
        res.json(true)
    } else {
        res.status(404);
        res.json('Книга не найдена');
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)