import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizList from './components/QuizList';
import QuestionList from './components/QuestionList';
import QuizForm from './components/QuizForm';
import QuestionForm from './components/QuestionForm';
import { getQuizzes, getQuestions, createQuiz, updateQuiz, deleteQuiz, createQuestion, updateQuestion, deleteQuestion } from './services/api';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('quizzes');

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  useEffect(() => {
    setEditingQuiz(null);
    setEditingQuestion(null);
  }, [activeTab]);

  const fetchQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuizAction = async (action, id = null, quizData = null) => {
    try {
      switch (action) {
        case 'create':
          await createQuiz(quizData);
          break;
        case 'update':
          await updateQuiz(id, quizData);
          break;
        case 'delete':
          await deleteQuiz(id);
          break;
        default:
          throw new Error('Invalid action');
      }
      fetchQuizzes();
      setEditingQuiz(null);
    } catch (error) {
      console.error(`Error ${action}ing quiz:`, error);
    }
  };

  const handleQuestionAction = async (action, id = null, questionData = null) => {
    try {
      switch (action) {
        case 'create':
          await createQuestion(questionData);
          break;
        case 'update':
          await updateQuestion(id, questionData);
          break;
        case 'delete':
          await deleteQuestion(id);
          break;
        default:
          throw new Error('Invalid action');
      }
      fetchQuestions();
      setEditingQuestion(null);
    } catch (error) {
      console.error(`Error ${action}ing question:`, error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
            <Tab eventKey="quizzes" title="Quizzes">
              <QuizList
                quizzes={quizzes}
                onEditQuiz={(id) => setEditingQuiz(quizzes.find(q => q._id === id))}
                onDeleteQuiz={(id) => handleQuizAction('delete', id)}
              />
              <QuizForm 
                quiz={editingQuiz}
                onSubmit={(quizData) => handleQuizAction(editingQuiz ? 'update' : 'create', editingQuiz?._id, quizData)}
                onCancel={() => setEditingQuiz(null)}
              />
            </Tab>
            <Tab eventKey="questions" title="Questions">
              <QuestionList
                questions={questions}
                onEditQuestion={(id) => setEditingQuestion(questions.find(q => q._id === id))}
                onDeleteQuestion={(id) => handleQuestionAction('delete', id)}
              />
              <QuestionForm
                question={editingQuestion}
                onSubmit={(questionData) => handleQuestionAction(editingQuestion ? 'update' : 'create', editingQuestion?._id, questionData)}
                onCancel={() => setEditingQuestion(null)}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;