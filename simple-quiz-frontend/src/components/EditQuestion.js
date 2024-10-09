import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function EditQuestion() {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [options, setOptions] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/questions/${id}`);
        setText(response.data.text);
        setOptions(response.data.options.join(','));
        setCorrectAnswerIndex(response.data.correctAnswerIndex);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedQuestion = {
      text,
      options: options.split(','),
      correctAnswerIndex: parseInt(correctAnswerIndex)
    };
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/questions/${id}`, updatedQuestion);
      navigate('/questions');
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Question</h2>
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

      <Button variant="primary" type="submit" className="mt-3">Update</Button>
    </Form>
  );
}

export default EditQuestion;
