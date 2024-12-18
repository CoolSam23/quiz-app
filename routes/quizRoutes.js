const express = require('express');
const { createQuiz, getQuiz, submitAnswer, getResults } = require('../controllers/quizController');

const router = express.Router();

router.post('/', createQuiz);
router.get('/:id', getQuiz);
router.post('/:quizId/questions/:questionId/answer', submitAnswer);
router.get('/:quizId/results/:userId', getResults);

module.exports = router;
