import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function CreateQuestion() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      text,
      options: options.split(','),
      correctAnswerIndex: parseInt(correctAnswerIndex)
    };
    try {
      await axios.post('${process.env.REACT_APP_API_BASE_URL}/questions', newQuestion);
      navigate('/questions');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Question</h2>

      <Form.Group controlId="formQuestionText">
        <Form.Label>Question Text:</Form.Label>
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formOptions">
        <Form.Label>Options (comma separated):</Form.Label>
        <Form.Control
          type="text"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCorrectAnswerIndex">
        <Form.Label>Correct Answer Index:</Form.Label>
        <Form.Control
          type="number"
          value={correctAnswerIndex}
          onChange={(e) => setCorrectAnswerIndex(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">Create</Button> {/* Added margin-top */}
    </Form>
  );
}

export default CreateQuestion;
