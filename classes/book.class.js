const library = require('../store/library.store');
module.exports = class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        fileBook = "",
    ) {
        this.id = Object.values(library).length;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
}
