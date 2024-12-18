const request = require('supertest');
const app = require('../app');

describe('Quiz API Tests', () => {
    let quizId;
    const userId = 'test-user';

    it('should create a quiz', async () => {
        const response = await request(app)
            .post('/quizzes')
            .send({
                title: 'Math Quiz',
                questions: [
                    { text: 'What is 2 + 2?', options: ['1', '2', '3', '4'], correct_option: 3 },
                ],
            });

        expect(response.status).toBe(201);
        quizId = response.body.id;
    });

    it('should fetch the quiz', async () => {
        const response = await request(app).get(`/quizzes/${quizId}`);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Math Quiz');
    });

    it('should submit an answer', async () => {
        const response = await request(app)
            .post(`/quizzes/${quizId}/questions/${quizId}-q1/answer`)
            .send({ selected_option: 3 })
            .set('user-id', userId);

        expect(response.status).toBe(200);
        expect(response.body.is_correct).toBe(true);
    });

    it('should get user results', async () => {
        const response = await request(app).get(`/quizzes/${quizId}/results/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.score).toBe(1);
    });
});
