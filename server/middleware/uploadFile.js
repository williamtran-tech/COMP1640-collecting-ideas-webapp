const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploaded_files/images/ideas')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now()+ '_' + file.originalname)
    }
});

var upload = multer({
    storage: storage
});

module.exports = upload.single('file', (req, res) => {
    try {
        if (!req.file){
            console.log("No file upload");
        } else {
            console.log(req.file);
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
})