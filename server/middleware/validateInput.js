// Dependence for remove file
const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');

exports.checkInput = (req) => {
    for(var prop in req.body) {
        if (req.body[prop].trim().length === 0) {
            return true
        }
    }
    return false
}

exports.checkInputCSV = (data) => {
    for (var cells in data) {
        for (prop in data[cells]) {
            if (data[cells][prop].trim().length === 0) {
                return true;
            }
        }
    }
    return false;
}

exports.checkTime = (req) => {
    var d1 = new Date(req.body.closureDate);
    var d2 = new Date(req.body.finalClosureDate);
    var diff_date_in_date = d2.getDate() - d1.getDate();
    var diff_date_in_time = d2.getTime() - d1.getTime();
    if (diff_date_in_date <= 0 && diff_date_in_time <= 0) {
        return true;
    }
    return false;
}

exports.checkFilePath = (object) => {
    if (object.filePath) {

        const filePath = object.filePath;

        // // Split the folderPath string into an array of directory names
        const dirNames = filePath.split(path.sep);

        // Remove the first three elements of the array ('uploaded_files', 'uploads', and 'Honor Ceremony')
        dirNames.splice(0, 3);

        // Join the remaining directory names back into a path string
        const remainingPath = dirNames.join(path.sep);
        console.log(remainingPath);

        fs.rmSync(remainingPath, { recursive: true, force: true }, err => {
            if (err) {
              throw err
            }
            console.log(`${remainingPath} is deleted!`)
          })

        // // Get the root directory of the project
        // const rootDir = path.dirname(require.main.filename);

        // // Construct the full path to the directory to be deleted
        // const fullPath = path.join(rootDir, 'uploaded_files', 'uploads', remainingPath);

        // // Remove the directory and its contents recursively
        // fsx.rmdirSync(fullPath, { recursive: true });

        // fs.unlink(object.filePath, function(err) {
        //     if(err && err.code == 'ENOENT') {
        //         // file doens't exist
        //         console.info("File doesn't exist, won't remove it.");
        //     } else if (err) {
        //         // other errors, e.g. maybe we don't have enough permission
        //         console.error("Error occurred while trying to remove file");
        //     } else {
        //         console.info(`File removed`);
        //     }
        // });
    } else if (object.profileImage) {
        fs.unlink(object.profileImage, function(err) {
            if(err && err.code == 'ENOENT') {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
            } else {
                console.info(`File removed`);
            }
        });
    }
}

exports.checkPassword = (req) => {
    if (req.body.password !== req.body.cPassword || this.checkInput(req)) {
        return false
    } else {
        return true
    }
}