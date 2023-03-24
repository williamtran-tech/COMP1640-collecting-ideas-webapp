const express = require('express');
const router = express.Router();

const topic = require('../../controllers/topicController.js');
const idea = require('../../controllers/ideaController.js');
const checkAuth = require('../../middleware/checkAuth.js');
const uploadFile = require('../../middleware/uploadFile.js');

router.get('/', checkAuth,topic.list_all_topics);
router.get('/:topicId', checkAuth, topic.list_all_ideas_by_topic);
router.post('/:topicId', checkAuth, idea.create_idea);
router.post('/:topicId/upload', checkAuth, uploadFile, idea.create_idea);
// router.post('/create-idea/:topicId', checkAuth, uploadFileTest, idea.create_idea_test);

// router.post('/', ideaList.create_an_idea);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;