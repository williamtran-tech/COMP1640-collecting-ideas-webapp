const express = require('express');
const router = express.Router();
const ideaList = require('../../../controllers/ideaController.js');
const topic = require('../../../controllers/topicController.js');
const category = require('../../../controllers/categoryController.js'); 
const isAdmin = require('../../../middleware/isAdmin.js');

// TOPICS - ADMIN PANEL
router.get('/topics', isAdmin, topic.list_all_topics);
router.post('/topics', isAdmin, topic.create_topic);
router.put('/topics/:topicId', isAdmin, topic.update_topic);
router.delete('/topics/:topicId', isAdmin, topic.delete_topic);

// CATEGORIES - ADMIN PANEL
router.get('/categories', isAdmin, category.list_all_categories);
router.post('/categories', isAdmin, category.create_category);
router.put('/categories/:categoryId', isAdmin, category.update_category);
router.delete('/categories/:categoryId', isAdmin, category.delete_category);

module.exports = router;