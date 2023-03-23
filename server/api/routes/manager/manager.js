// const express = require('express');
// const router = express.Router();
// const idea = require('../../../controllers/ideaController.js');
// const topic = require('../../../controllers/topicController.js');
// const category = require('../../../controllers/categoryController.js');
// const department = require('../../../controllers/departmentController.js'); 
// const user = require('../../../controllers/userController.js');
// const isManager = require('../../../middleware/isManager.js');
// const uploadFile = require('../../../middleware/uploadFile.js');

// // TOPICS - ADMIN PANEL
// router.get('/topics', isManager, topic.list_all_topics);
// router.get('/topics/:topicId', isManager, topic.list_all_ideas_by_topic);
// router.post('/topics', isManager, topic.create_topic);
// router.put('/topics/:topicId', isManager, topic.update_topic);
// router.delete('/topics/:topicId', isManager, topic.delete_topic);
// router.delete('/topics/force-delete/:topicId', isManager, topic.force_delete);

// // CATEGORIES - ADMIN PANEL
// router.get('/categories', isManager, category.list_all_categories);
// router.post('/categories', isManager, category.create_category);
// router.put('/categories/:categoryId', isManager, category.update_category);
// router.delete('/categories/:categoryId', isManager, category.delete_category);
// router.delete('/categories/force-delete/:categoryId', isManager, category.force_delete);

// // IDEAS - ADMIN PANEL
// router.get('/ideas/:id', isManager, idea.get_idea_by_id);
// router.put('/ideas/:id', isManager, uploadFile, idea.update_idea);
// router.delete('/ideas/:id', isManager, idea.delete_idea);
// router.get('/csv-topic/download/:id', isManager, topic.download_topic_csv);
// router.get('/statistic', isManager, topic.insight);
// router.get('/statistic/topics/:id', isManager, topic.most_viewed_ideas);

// module.exports = router;