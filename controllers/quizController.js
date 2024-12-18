const { quizzes, results } = require('../models/quizModel');
const { v4: uuidv4 } = require('uuid');

// Create a new quiz
exports.createQuiz = (req, res) => {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ error: 'Invalid input: Title and questions are required.' });
    }

    const quizId = uuidv4();
    quizzes[quizId] = {
        id: quizId,
        title,
        questions: questions.map((q, index) => ({
            id: `${quizId}-q${index + 1}`,
            text: q.text,
            options: q.options,
            correct_option: q.correct_option,
        })),
    };

    res.status(201).json({ id: quizId });
};

// Get a quiz by ID
exports.getQuiz = (req, res) => {
    const quiz = quizzes[req.params.id];
    if (!quiz) return res.status(404).json({ error: 'Quiz not found.' });

    const sanitizedQuiz = {
        id: quiz.id,
        title: quiz.title,
        questions: quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options,
        })),
    };

    res.status(200).json(sanitizedQuiz);
};

// Submit an answer for a specific question
exports.submitAnswer = (req, res) => {
    const quiz = quizzes[req.params.quizId];
    if (!quiz) return res.status(404).json({ error: 'Quiz not found.' });

    const question = quiz.questions.find(q => q.id === req.params.questionId);
    if (!question) return res.status(404).json({ error: 'Question not found.' });

    const { selected_option } = req.body;
    if (selected_option < 0 || selected_option >= question.options.length) {
        return res.status(400).json({ error: 'Invalid option selected.' });
    }

    const userId = req.headers['user-id'] || 'guest';
    if (!results[userId]) results[userId] = {};
    if (!results[userId][req.params.quizId]) results[userId][req.params.quizId] = { score: 0, answers: [] };

    const isCorrect = selected_option === question.correct_option;
    results[userId][req.params.quizId].answers.push({
        question_id: question.id,
        selected_option,
        is_correct: isCorrect,
    });

    if (isCorrect) results[userId][req.params.quizId].score++;

    res.status(200).json({ is_correct: isCorrect, correct_option: question.correct_option });
};

// Get results for a quiz and user
exports.getResults = (req, res) => {
    const userResults = results[req.params.userId]?.[req.params.quizId];
    if (!userResults) return res.status(404).json({ error: 'Results not found.' });

    res.status(200).json(userResults);
};
