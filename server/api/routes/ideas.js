const express = require('express');
const router = express.Router();
const tasks = require('../../models/tasks.js');

var taskList = require('../../controllers/taskController.js');

router.get('/', taskList.list_all_tasks);

router.post('/', taskList.create_a_task);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;