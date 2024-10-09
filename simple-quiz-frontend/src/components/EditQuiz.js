import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({ title: '', description: '', questions: [] });
  const [newQuestions, setNewQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ text: '', options: '', correctAnswerIndex: 0 });
  const [error, setError] = useState(null);

  const fetchQuiz = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/quizzes/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      handleError('Error fetching quiz:', 'Unable to load quiz information. Please try again later.');
    }
  }, [quizId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleError = (logMessage, userMessage) => {
    console.error(logMessage);
    setError(userMessage);
  };

  const handleQuizUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/quizzes/${quizId}`, { title: quiz.title, description: quiz.description });
      navigate(`/quizzes/${quizId}`);
    } catch {
      handleError('Error updating quiz:', 'Unable to update quiz. Please try again later.');
    }
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) {
      setError('Please enter the question content');
      return;
    }

    const optionsArray = currentQuestion.options.split(',').map(option => option.trim());
    if (optionsArray.length < 2) {
      setError('Please enter at least two options, separated by commas');
      return;
    }

    const newQuestion = {
      ...currentQuestion,
      options: optionsArray,
      correctAnswerIndex: Math.min(currentQuestion.correctAnswerIndex, optionsArray.length - 1),
    };

    setNewQuestions(prev => [...prev, newQuestion]);
    setCurrentQuestion({ text: '', options: '', correctAnswerIndex: 0 });
    setError(null);
  };

  const handleSaveAllQuestions = async () => {
    if (newQuestions.length === 0) {
      setError('No new questions to save');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/quizzes/${quizId}/questions`, newQuestions);
      setQuiz(prevQuiz => ({
        ...prevQuiz,
        questions: [...prevQuiz.questions, ...response.data],
      }));
      setNewQuestions([]);
      alert('All new questions have been saved successfully');
    } catch (error) {
      const userMessage = error.response
        ? `Error from server: ${error.response.data.message || 'Undefined'}`
        : 'An error occurred while saving the questions. Please try again later.';
      handleError('Error saving questions:', userMessage);
    }
  };

  return (
    <div className="container">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleQuizUpdate}>
        <h2>Edit Quiz</h2>
        
        <Form.Group controlId="formQuizTitle">
          <Form.Label>Quiz Title:</Form.Label>
          <Form.Control
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formQuizDescription">
          <Form.Label>Quiz Description:</Form.Label>
          <Form.Control
            type="text"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">Update Quiz</Button>
      </Form>

      <h3 className="mt-4">Add New Question</h3>
      <Form>
        <Form.Group controlId="formNewQuestionText">
          <Form.Label>Question Content:</Form.Label>
          <Form.Control
            type="text"
            value={currentQuestion.text}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
            placeholder="Enter question content"
          />
        </Form.Group>

        <Form.Group controlId="formNewQuestionOptions">
          <Form.Label>Options (comma separated):</Form.Label>
          <Form.Control
            type="text"
            value={currentQuestion.options}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: e.target.value })}
            placeholder="Option 1, Option 2, Option 3..."
          />
        </Form.Group>

        <Form.Group controlId="formNewQuestionCorrectAnswerIndex">
          <Form.Label>Correct Answer Index:</Form.Label>
          <Form.Control
            type="number"
            value={currentQuestion.correctAnswerIndex}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswerIndex: parseInt(e.target.value, 10) })}
            placeholder="Index of the correct answer (starting from 0)"
            min="0"
          />
        </Form.Group>
        
        <Button onClick={handleAddQuestion} variant="secondary" className="mt-2">Add Question</Button>
      </Form>

      <h3 className="mt-4">New Questions (Not Saved)</h3>
      {newQuestions.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
          <p>Correct answer: {question.correctAnswerIndex + 1}</p>
        </div>
      ))}
      <Button onClick={handleSaveAllQuestions} variant="primary" className="mt-2">Save All New Questions</Button>

      <h3 className="mt-4">Current Questions</h3>
      {quiz.questions.map((question, index) => (
        <div key={question._id || index}>
          <p>{question.text}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
          <p>Correct answer: {question.correctAnswerIndex + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default EditQuiz;
