const router = require('express').Router;
const multer = require('multer');

const filename = (request, file, callback) => {
    callback(null, file.originalname)
}
const storage = multer.diskStorage({destination: 'api/uploads', filename});

const fileFilter = (request, file, callback) => {
    if (request.fileValidatorError === 'Wrong file type'){
        callback(null, false, new Error('Wrong file type'))
    } else {
        callback(null, true);
    }
}

const upload = multer({
    fileFilter, storage
})

router.post('/upload', upload.single('photo'), (req, res) => {
    if (req.fileValidatorError){
        res.status(400).json({error: req.fileValidatorError})
    }
    if (!req.fileValidatorError){
        res.status(201).json({success: true})
    }
});

module.exports = router;