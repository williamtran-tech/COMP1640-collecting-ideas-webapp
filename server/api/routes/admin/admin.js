// const express = require('express');
// const router = express.Router();
// const idea = require('../../../controllers/ideaController.js');
// const topic = require('../../../controllers/topicController.js');
// const category = require('../../../controllers/categoryController.js');
// const department = require('../../../controllers/departmentController.js'); 
// const user = require('../../../controllers/userController.js');
// const isAccessible = require('../../../middleware/isAccessible.js');
// const uploadFile = require('../../../middleware/uploadFile.js');
// const uploadCsv = require('./../../../middleware/uploadCsv.js');

// // TOPICS - ADMIN PANEL
// router.get('/topics', isAccessible, topic.list_all_topics);
// router.get('/topics/:topicId', isAccessible, topic.list_all_ideas_by_topic);
// router.post('/topics', isAccessible, topic.create_topic);
// router.put('/topics/:topicId', isAccessible, topic.update_topic);
// router.delete('/topics/:topicId', isAccessible, topic.delete_topic);
// router.delete('/topics/force-delete/:topicId', isAccessible, topic.force_delete);

// // CATEGORIES - ADMIN PANEL
// router.get('/categories', isAccessible, category.list_all_categories);
// router.post('/categories', isAccessible, category.create_category);
// router.put('/categories/:categoryId', isAccessible, category.update_category);
// router.delete('/categories/:categoryId', isAccessible, category.delete_category);
// router.delete('/categories/force-delete/:categoryId', isAccessible, category.force_delete);

// // IDEAS - ADMIN PANEL
// router.get('/ideas/:id', isAccessible, idea.get_idea_by_id);
// router.put('/ideas/:id', isAccessible, uploadFile, idea.update_idea);
// router.delete('/ideas/:id', isAccessible, idea.delete_idea);

// // DEPARTMENTS - ADMIN PANEL
// router.get('/departments', isAccessible, department.list_all_departments);
// router.get('/departments/:id', isAccessible, department.list_all_users_by_department);
// router.post('/departments', isAccessible, department.create_department);
// router.put('/departments/:id', isAccessible, department.update_department);
// router.delete('/departments/:id', isAccessible, department.delete_department);

// // USERS - ADMIN PANEL
// router.get('/users', isAccessible, user.list_all_users);
// router.post('/users', isAccessible, user.create_user);
// router.put('/users/:id', isAccessible, uploadFile, user.update_user);
// router.delete('/users/:id', isAccessible, user.delete_user);
// router.delete('/users/force-delete/:id', isAccessible, user.force_delete_user);
// router.get('/users/template-insert/download', isAccessible, user.download_template);
// router.post('/users/bulks-insert', isAccessible, uploadCsv, user.bulk_insert);


// module.exports = router;