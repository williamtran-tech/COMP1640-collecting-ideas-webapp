const express = require('express');
const router = express.Router();
const idea = require('../../../controllers/ideaController.js');
const topic = require('../../../controllers/topicController.js');
const category = require('../../../controllers/categoryController.js');
const department = require('../../../controllers/departmentController.js'); 
const user = require('../../../controllers/userController.js');
const isManager = require('../../../middleware/isManager.js');
const uploadFile = require('../../../middleware/uploadFile.js');

router.get('/csv-topic/download/:id', isManager, topic.download_topic_csv);

module.exports = router;