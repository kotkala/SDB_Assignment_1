import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getQuizzes = () => api.get('/quizzes');
export const createQuiz = (quizData) => api.post('/quizzes', quizData);
export const updateQuiz = (id, quizData) => api.put(`/quizzes/${id}`, quizData);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);
export const getQuizDetails = (id) => api.get(`/quizzes/${id}`);

export const getQuestions = () => api.get('/questions');
export const createQuestion = (questionData) => api.post('/questions', questionData);
export const updateQuestion = (id, questionData) => api.put(`/questions/${id}`, questionData);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);
export const getQuestionDetails = (id) => api.get(`/questions/${id}`);

export const addQuestionToQuiz = (quizId, questionId) => api.post(`/quizzes/${quizId}/questions`, { questionId });

// New functions to create a single or bulk questions in a quiz
export const createQuestionInQuiz = (quizId, questionData) => api.post(`/quizzes/${quizId}/questions`, questionData);

export const createQuestionsInQuiz = (quizId, questionsData) => api.post(`/quizzes/${quizId}/questions/bulk`, questionsData);
