# Quiz Application

This is a full-stack quiz application with a Node.js backend API and a React frontend.

## Live Demo

The application is deployed on Render:
- Frontend: https://sdn-assignment-1-1.onrender.com/
- Backend API: https://sdn-assignment-1.onrender.com/

## Project Structure

```
quiz-application/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md
```

## Backend

### Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://group4username:group4password@cluster0.6jcal.mongodb.net/SimpleQuiz
   ```
   Note: It's crucial to keep your database credentials secure. In a production environment, never commit the .env file to version control.

4. Start the server: `npm start`

### Database Configuration

This application uses MongoDB Atlas as the database. Here's how to set it up:

1. If you don't have a MongoDB Atlas account, create one at https://www.mongodb.com/cloud/atlas
2. Create a new cluster if you haven't already
3. In the cluster, click on "Connect"
4. Choose "Connect your application"
5. Copy the connection string. It should look similar to:
   ```
   mongodb+srv://<username>:<password>@cluster0.6jcal.mongodb.net/<dbname>
   ```
6. Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas username, password, and database name respectively
7. In this case, the database name is "SimpleQuiz"

For local development:
- You can use the same MongoDB Atlas cluster
- Alternatively, you can set up a local MongoDB instance and use a connection string like `mongodb://localhost:27017/SimpleQuiz`

Remember to update the `MONGODB_URI` in your `.env` file with the appropriate connection string.

### API Endpoints

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

For detailed API documentation, please refer to the API.md file in the backend directory.

## Frontend

### Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the frontend directory with the following content:
   ```
   REACT_APP_API_URL=https://sdn-assignment-1.onrender.com
   ```
   This points to the deployed backend API. For local development, you may want to use `http://localhost:3000` or whatever port your local backend runs on.
4. Start the development server: `npm start`

### Features

- Interactive quiz interface
- View and take quizzes
- Create new quizzes and questions
- Edit existing quizzes and questions
- Delete quizzes and questions

## Deployment

The application is deployed on Render.

### Backend Deployment

The backend API is deployed at https://sdn-assignment-1.onrender.com/

To use the deployed API:
1. No authentication is required for this version.
2. Use your preferred HTTP client to send requests to the endpoints.
3. Ensure you're using the correct HTTP method (GET, POST, PUT, DELETE) for each endpoint.
4. For POST and PUT requests, include the necessary data in the request body as JSON.

When deploying to Render or any other platform:
1. Set the `MONGODB_URI` environment variable in your deployment platform's settings.
2. Ensure that the MongoDB Atlas network access settings allow connections from your deployment platform.

### Frontend Deployment

The frontend is deployed at https://sdn-assignment-1-1.onrender.com/

To use the deployed frontend:
1. Simply visit the URL in your web browser.
2. The frontend is configured to communicate with the deployed backend API.

## Development

To run the entire application locally:

1. Start the backend server (follow backend setup instructions)
2. In a new terminal, start the frontend development server (follow frontend setup instructions)
3. Update the frontend's `.env` file to point to your local backend URL
4. The frontend should now be able to communicate with the local backend API

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Feedback and Issues

If you encounter any issues or have suggestions for improvement, please open an issue in this repository.

## Licensing

[Add licensing information here if applicable]
