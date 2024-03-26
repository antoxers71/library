const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'book-files')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports = multer({storage})