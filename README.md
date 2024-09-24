# SDB_Assignment_1
# Quiz API

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/SimpleQuiz
   ```
   Adjust the values as needed for your environment.
4. Run `npm start` to start the server

## Available Endpoints

- GET /quizzes
- POST /quizzes
- GET /quizzes/:quizId
- PUT /quizzes/:quizId
- DELETE /quizzes/:quizId
- GET /questions
- POST /questions
- GET /questions/:questionId
- PUT /questions/:questionId
- DELETE /questions/:questionId

For detailed API documentation, please refer to the API.md file.
