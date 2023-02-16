const express = require('express');
const router = express.Router();

var topicList = require('../../controllers/topicController.js');

router.get('/', topicList.list_all_topics);
router.get('/:topicId', topicList.list_all_ideas_by_topic);

// router.post('/', ideaList.create_an_idea);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;