import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'; // Import Card and Button from react-bootstrap

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/quizzes`)
      .then(response => setQuizzes(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/quizzes/${id}`)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz._id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Quizzes List</h1>
      <Link to="/quizzes/new" className="btn btn-primary mb-3">Create New Quiz</Link>
      <div className="list-group">
        {quizzes.map(quiz => (
          <Card className="mb-3" key={quiz._id}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">
                <Link to={`/quizzes/${quiz._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                  {quiz.title}
                </Link>
              </Card.Title>
              <Button 
                variant="danger" 
                onClick={() => handleDelete(quiz._id)}
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

export default QuizList;
