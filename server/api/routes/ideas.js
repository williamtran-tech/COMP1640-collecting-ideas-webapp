const express = require('express');
const router = express.Router();

var ideaList = require('../../controllers/ideaController.js');

router.get('/', ideaList.all_ideas);

// router.get('/:ideaId', ideaList.get_idea_by_id);
// router.post('/', ideaList.create_an_idea);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;