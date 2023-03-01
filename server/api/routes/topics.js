const express = require('express');
const router = express.Router();

var topicList = require('../../controllers/topicController.js');
const checkAuth = require('../../middleware/checkAuth.js');
const uploadFile = require('../../middleware/uploadFile.js');

router.get('/', checkAuth,topicList.list_all_topics);
router.get('/:topicId', checkAuth, topicList.list_all_ideas_by_topic);
router.post('/:topicId', checkAuth, topicList.create_idea);
// This function is not done yet
router.post('/:topicId/upload', checkAuth, uploadFile, topicList.upload_file);

// router.post('/', ideaList.create_an_idea);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;