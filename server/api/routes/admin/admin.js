const express = require('express');
const router = express.Router();
const ideaList = require('../../../controllers/ideaController.js');
const topic = require('../../../controllers/topicController.js');
const isAdmin = require('../../../middleware/isAdmin.js');

router.get('/topics', isAdmin, topic.list_all_topics);
router.post('/topics', isAdmin, topic.create_topic);
router.put('/topics/:topicId', isAdmin, topic.update_topic);
router.delete('/topics/:topicId', isAdmin, topic.delete_topic);

module.exports = router;