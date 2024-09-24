const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.getAllQuizzes);
router.post('/', quizController.createQuiz);
router.get('/:quizId', quizController.getQuiz);
router.put('/:quizId', quizController.updateQuiz);
router.delete('/:quizId', quizController.deleteQuiz);
router.post('/:quizId/question', quizController.createQuestionInQuiz);
router.post('/:quizId/questions', quizController.createQuestionsInQuiz);
module.exports = router;