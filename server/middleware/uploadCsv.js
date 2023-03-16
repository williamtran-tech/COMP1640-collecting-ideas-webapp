const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploaded_files/bulk_insert')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now()+ '_' + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            const err = new Error('Only CSV files are allowed');
            err.status = 400;
            return cb(err);
        }
        cb(null, true);
    }
}).single('file');

const uploadCsv = (req, res, next) => {
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
                } else if (err.message === 'Only CSV files are allowed') {
                    return res.status(400).json({
                        error: 'Only CSV files are allowed'
                    });
                }
                return res.status(400).json({
                    error: err.message
                });
            } else {
                next();
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

module.exports = uploadCsv;
