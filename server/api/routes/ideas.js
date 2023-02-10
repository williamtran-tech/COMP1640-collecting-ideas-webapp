const express = require('express');
const router = express.Router();

var ideaList = require('../../controllers/ideaController.js');

router.get('/', ideaList.list_all_ideas);
router.post('/', ideaList.create_an_idea);

// router.put('/:ideaId', (req, res, next) => {
//     const id = req.params.ideaId;

//     res.status(200).json({
//         message: 'Updated idea: ' + id,
//     });
// });

module.exports = router;