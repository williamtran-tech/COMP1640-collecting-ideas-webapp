const express = require('express');
const router = express.Router();

var idea = require('../../controllers/ideaController.js');
const checkAuth = require('../../middleware/checkAuth.js');

router.get('/', idea.all_ideas);
router.get('/:id', idea.get_idea_by_id);
router.put('/:id', checkAuth, idea.react);

// router.get('/:ideaId', ideaList.get_idea_by_id);
// router.post('/', ideaList.create_an_idea);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;