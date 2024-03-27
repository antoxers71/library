const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        const destination = file.fieldname === 'fileCover' ? 'cover-files' : 'book-files';
        cb(null, destination)
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports = multer({storage})