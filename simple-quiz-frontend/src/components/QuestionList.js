import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/questions`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/questions/${id}`)
      .then(() => {
        setQuestions(questions.filter(question => question._id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Questions List</h1>
      <Link to="/questions/new" className="btn btn-primary mb-3">Create New Question</Link>
      <div className="list-group">
        {questions.map(question => (
          <Card className="mb-3" key={question._id}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">
                <Link to={`/questions/${question._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                  {question.text}
                </Link>
              </Card.Title>
              <Button 
                variant="danger" 
                onClick={() => handleDelete(question._id)}
                className="ml-3" // Thêm khoảng cách bên trái nút
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
