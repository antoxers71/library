const express = require('express');
const Book = require("../classes/book.class");
const library = require("../store/library.store");
const router = express.Router();

router.get('/', (req, res) => {
    const listBook = Object.values(library);
    res.json(listBook);
})

router.get('/:id', (req, res) => {
    const {id} = req.params;

    if(library[id]) {
        res.json(library[id]);
    } else {
        res.status(404);
        res.json('Книга не найдена');
    }
});

router.post('/', (req, res) => {
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
    library[newBook.id] = newBook;

    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => {
    const {id} = req.params;

    if (library[id]) {
        library[id] = Object.assign(library[id], req.body);
        res.json(library[id]);
    } else {
        res.status(404);
        res.json('Книга не найдена');
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    if (library[id]){
        delete library[id];
        res.json(true);
    } else {
        res.status(404);
        res.json('Книга не найдена');
    }
})

module.exports = router;