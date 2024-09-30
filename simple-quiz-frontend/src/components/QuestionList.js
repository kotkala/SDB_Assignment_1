import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  return (
    <div>
      <h2>Questions</h2>
      <ListGroup>
        {questions.map(question => (
          <ListGroup.Item key={question._id} className="d-flex justify-content-between align-items-center">
            {question.text}
            <div>
              <Button variant="warning" className="mr-2" onClick={() => onEditQuestion(question._id)}>Edit</Button>
              <Button variant="danger" onClick={() => onDeleteQuestion(question._id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default QuestionList;