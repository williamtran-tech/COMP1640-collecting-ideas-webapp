const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploaded_files/images/profile')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now()+ '_' + file.originalname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg') {
            const err = new Error('Only Image files are allowed');
            err.status = 400;
            return cb(err);
        }
        cb(null, true);
    }
}).single('file');

const uploadImg = (req, res, next) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            error: 'File size too large'
                        });
                    }
                } else if (err.message === 'Only Image files are allowed') {
                    return res.status(400).json({
                        error: 'Only Image files are allowed'
                    });
                }
                return res.status(400).json({
                    error: err.message
                });
            } else {
                next();
            }
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

module.exports = uploadImg;