# Quiz App API

A RESTful API for a quiz application built using Node.js and Express. This application allows users to create quizzes, answer questions, and view their results.

---

## Features
- Create a new quiz with multiple questions and options.
- Fetch quizzes without revealing correct answers.
- Submit answers to quiz questions and receive immediate feedback.
- View results with a score and summary of answers.

---

## Requirements
- Node.js (>= 16.x.x)
- Docker (optional, for containerized setup)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd quiz-app
2. Install Dependencies
bash
Copy code
npm install
3. Run the Application
bash
Copy code
npm start
The server will start at http://localhost:3000.

4. Run Tests
bash
Copy code
npm test
Dockerized Setup
You can use the provided docker-compose.yml file to run the service in a containerized environment.

1. Build and Run the Containers
bash
Copy code
docker-compose up --build
2. Access the API
The API will be available at http://localhost:3000.

API Endpoints
1. Create Quiz
POST /quizzes
Request Body:

json
Copy code
{
  "title": "Math Quiz",
  "questions": [
    {
      "text": "What is 2 + 2?",
      "options": ["1", "2", "3", "4"],
      "correct_option": 3
    }
  ]
}
Response:

json
Copy code
{
  "id": "generated-quiz-id"
}
2. Get Quiz
GET /quizzes/:id
Response:

json
Copy code
{
  "id": "quiz-id",
  "title": "Math Quiz",
  "questions": [
    {
      "id": "question-id",
      "text": "What is 2 + 2?",
      "options": ["1", "2", "3", "4"]
    }
  ]
}
3. Submit Answer
POST /quizzes/:quizId/questions/:questionId/answer
Request Body:

json
Copy code
{
  "selected_option": 3
}
Response:

json
Copy code
{
  "is_correct": true,
  "correct_option": 3
}
4. Get Results
GET /quizzes/:quizId/results/:userId
Response:

json
Copy code
{
  "quiz_id": "quiz-id",
  "user_id": "user-id",
  "score": 1,
  "answers": [
    {
      "question_id": "question-id",
      "selected_option": 3,
      "is_correct": true
    }
  ]
}
Known Issues / Limitations
In-memory Storage: The application uses an in-memory backend, meaning data will reset when the server restarts. For production, consider using a persistent database like MongoDB or PostgreSQL.
No Authentication: The app does not include user authentication. All results are stored against a simple user-id provided in the request headers.
No Pagination: Fetching a quiz returns all questions at once. This could be inefficient for quizzes with a large number of questions.
License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

Running with Docker
Build and Run Containers

bash
Copy code
docker-compose up --build
Access the API

The API will be available at http://localhost:3000.
