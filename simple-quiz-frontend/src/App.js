import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap'; // Import Nav và Button từ react-bootstrap
import QuestionList from './components/QuestionList';
import CreateQuestion from './components/CreateQuestion';
import EditQuestion from './components/EditQuestion';
import DisplayQuestion from './components/DisplayQuestion';
import CreateQuiz from './components/CreateQuiz';
import DisplayQuiz from './components/DisplayQuiz';
import EditQuiz from './components/EditQuiz';
import QuizList from './components/QuizList';

function App() {
  return (
    <Container>
      <Navbar  expand="lg">
        <Navbar.Brand as={Link} to="/">Quiz App</Navbar.Brand>
        <Nav className="ml-auto">
          <Button as={Link} to="/quizzes" variant="outline-primary" className="mr-2">
            Quizzes
          </Button>
          <Button as={Link} to="/questions" variant="outline-secondary">
            Questions
          </Button>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/new" element={<CreateQuiz />} />
        <Route path="/quizzes/:quizId" element={<DisplayQuiz />} />
        <Route path="/quizzes/:quizId/edit" element={<EditQuiz />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/new" element={<CreateQuestion />} />
        <Route path="/questions/:id/edit" element={<EditQuestion />} />
        <Route path="/questions/:id" element={<DisplayQuestion />} />
      </Routes>
    </Container>
  );
}

export default App;
