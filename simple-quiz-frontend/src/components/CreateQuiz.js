import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuiz = { title, description };
    axios.post('${process.env.REACT_APP_API_BASE_URL}/quizzes', newQuiz)
      .then(() => {
        navigate('/quizzes');
      })
      .catch(error => console.log(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Quiz</h2>

      <Form.Group controlId="formQuizTitle">
        <Form.Label>Quiz Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formQuizDescription">
        <Form.Label>Quiz Description:</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">Create</Button> {/* Added margin-top */}
    </Form>
  );
}

export default CreateQuiz;
