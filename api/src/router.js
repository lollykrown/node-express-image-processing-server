const router = require('express').Router;
const multer = require('multer');
const path = require('path');
const imageProcessor = require('./imageProcessor');

const filename = (request, file, callback) => {
    callback(null, file.originalname)
}
const storage = multer.diskStorage({destination: 'api/uploads', filename});

const fileFilter = (request, file, callback) => {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'));
    } else {
        callback(null, true);
    }
}

const upload = multer({
    fileFilter, storage
})

router.post('/upload', upload.single('photo'), (req, res) => {
    if (req.fileValidatorError){
        return res.status(400).json({error: req.fileValidatorError})
    }
    return res.status(201).json({success: true})
});

router.get('/photo-viewer', (request, response) => {
    response.sendFile(photoPath);
  });
  
module.exports = router;