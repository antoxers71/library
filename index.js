const express = require('express');
const errorMiddleware = require('./middleware/error');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');
const booksViewRouter = require('./routes/books-view');


const app = express();
app.use(express.urlencoded());
app.use('/book-files', express.static(__dirname + '/book-files'));
app.use('/cover-files', express.static(__dirname + '/cover-files'));

app.set("view engine", "ejs");

app.use('/', booksViewRouter);

app.use('/api/user', userRouter);

app.use('/api/books', booksRouter);

app.use('/api/books/:id', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT)