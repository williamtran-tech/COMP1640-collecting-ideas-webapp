const express = require('express');
const router = express.Router();
const idea = require('../../../controllers/ideaController.js');
const topic = require('../../../controllers/topicController.js');
const category = require('../../../controllers/categoryController.js');
const department = require('../../../controllers/departmentController.js'); 
const user = require('../../../controllers/userController.js');
const isAdmin = require('../../../middleware/isAdmin.js');
const uploadFile = require('../../../middleware/uploadFile.js');
const uploadCsv = require('./../../../middleware/uploadCsv.js');

// TOPICS - ADMIN PANEL
router.get('/topics', isAdmin, topic.list_all_topics);
router.get('/topics/:topicId', isAdmin, topic.list_all_ideas_by_topic);
router.post('/topics', isAdmin, topic.create_topic);
router.put('/topics/:topicId', isAdmin, topic.update_topic);
router.delete('/topics/:topicId', isAdmin, topic.delete_topic);
router.delete('/topics/force-delete/:topicId', isAdmin, topic.force_delete);

// CATEGORIES - ADMIN PANEL
router.get('/categories', isAdmin, category.list_all_categories);
router.post('/categories', isAdmin, category.create_category);
router.put('/categories/:categoryId', isAdmin, category.update_category);
router.delete('/categories/:categoryId', isAdmin, category.delete_category);
router.delete('/categories/force-delete/:categoryId', isAdmin, category.force_delete);

// IDEAS - ADMIN PANEL
router.get('/ideas/:id', isAdmin, idea.get_idea_by_id);
router.put('/ideas/:id', isAdmin, uploadFile, idea.update_idea);
router.delete('/ideas/:id', isAdmin, idea.delete_idea);

// DEPARTMENTS - ADMIN PANEL
router.get('/departments', isAdmin, department.list_all_departments);
router.get('/departments/:id', isAdmin, department.list_all_users_by_department);
router.post('/departments', isAdmin, department.create_department);
router.put('/departments/:id', isAdmin, department.update_department);
router.delete('/departments/:id', isAdmin, department.delete_department);

// USERS - ADMIN PANEL
router.get('/users', isAdmin, user.list_all_users);
router.post('/users', isAdmin, user.create_user);
router.put('/users/:id', isAdmin, uploadFile, user.update_user);
router.delete('/users/:id', isAdmin, user.delete_user);
router.get('/users/template-insert/download', isAdmin, user.download_template);
router.post('/users/bulks-insert', isAdmin, uploadCsv, user.bulk_insert);


module.exports = router;