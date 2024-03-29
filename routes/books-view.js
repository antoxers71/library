const express = require('express');
const Book = require("../classes/book.class");
const library = require("../store/library.store");
const router = express.Router();
const fileMulter = require('../middleware/file');

router.get('/', (req, res) => {
    res.render("index", {
        title: "Библиотека",
        books: Object.values(library),
    });
});

router.get('/create', (req, res) => {
    res.render("create", {
        title: "Добавить книгу",
        book: {},
    });
});

router.post('/create',
    fileMulter.fields([
        {name: 'fileBook', maxCount: 1},
        {name: 'fileCover', maxCount: 1},
    ]),
    (req, res) => {
        const {
            title,
            description,
            authors,
            favorite,
            fileName
        } = req.body;

        const fileBook = req.files.fileBook ? req.files.fileBook[0].path : undefined;
        const fileCover = req.files.fileCover ? req.files.fileCover[0].path : undefined;

        const newBook = new Book(
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        );
        library[newBook.id] = newBook;

        res.redirect('/')
    });

router.get('/view/:id', (req, res) => {
    const {id} = req.params;

    if(!library[id]) {
        res.redirect('/404');
        res.json('Книга не найдена');
    }

    res.render("view", {
        title: "Инофрмация о книге",
        book: library[id],
    });
});

router.get('/update/:id', (req, res) => {
    const {id} = req.params;

    if(!library[id]) {
        res.redirect('/404');
        res.json('Книга не найдена');
    }

    res.render("update", {
        title: "Инофрмация о книге",
        book: library[id],
    });
});

router.post('/update/:id', (req, res) => {
    const {id} = req.params;

    if (!library[id]) {
        res.redirect('/404');
    }

    library[id] = Object.assign(library[id], req.body);

    res.redirect(`/view/${id}`);
});

router.post('/delete/:id', (req, res) => {
    const {id} = req.params;

    if (!library[id]){
        res.redirect('/404');
    }

    delete library[id];
    res.redirect(`/`);
});

module.exports = router;