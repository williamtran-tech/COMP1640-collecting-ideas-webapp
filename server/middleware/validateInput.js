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
        // Split the folderPath string into an array of directory names
        const dirNames = filePath.split('/');
    
        const rootDir = path.dirname(require.main.filename);
        const topic = dirNames[2]; // Replace with the topic folder name
        const idea = dirNames[3]; // Replace with the idea folder name
    
        // Construct the folder path to be deleted
        const folderPath = path.join(rootDir, 'uploaded_files/uploads', topic, idea);
        // Construct the path to the topic folder
        const topicPath = path.join(rootDir, 'uploaded_files/uploads', topic);
    
        // Read the contents of the topic folder
        fs.readdir(topicPath, (err, files) => {
            if (err) {
                console.error(err);
            } else {
                // Check if the topic folder contains any subdirectories
                const subdirectories = files.filter(file => fs.statSync(path.join(topicPath, file)).isDirectory());
    
                if (subdirectories.length > 1) {
                    // Recursively delete the folder and its contents
                    fs.rmdir(folderPath, { recursive: true }, (err) => {
                        if (err) {
                          console.error(err);
                        } else {
                          console.log(`Folder Idea ${folderPath} was successfully removed.`);
                        }
                      });
                } else {
                    // Recursively delete the folder and its contents
                    fs.rmdir(topicPath, { recursive: true }, (err) => {
                        if (err) {
                          console.error(err);
                        } else {
                          console.log(`Folder Topic ${topicPath} was successfully removed.`);
                        }
                    });
                }
            }   
        });

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