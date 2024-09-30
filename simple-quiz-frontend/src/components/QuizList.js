import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function QuizList({ quizzes, onEditQuiz, onDeleteQuiz }) {
  return (
    <div>
      <h2>Quizzes</h2>
      <ListGroup>
        {quizzes.map(quiz => (
          <ListGroup.Item key={quiz._id} className="d-flex justify-content-between align-items-center">
            {quiz.title}
            <div>
              <Button variant="warning" className="mr-2" onClick={() => onEditQuiz(quiz._id)}>Edit</Button>
              <Button variant="danger" onClick={() => onDeleteQuiz(quiz._id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default QuizList;