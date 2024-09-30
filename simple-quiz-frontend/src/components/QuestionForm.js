import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function QuestionForm({ question, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswerIndex: 0,
  });

  useEffect(() => {
    if (question) {
      setFormData({
        text: question.text || '',
        options: question.options || ['', '', '', ''],
        correctAnswerIndex: question.correctAnswerIndex || 0,
      });
    } else {
      setFormData({
        text: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
      });
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prevData => ({
      ...prevData,
      options: newOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>{question ? 'Edit Question' : 'Create New Question'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Question Text</Form.Label>
          <Form.Control 
            type="text" 
            name="text"
            value={formData.text} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        {formData.options.map((option, index) => (
          <Form.Group key={index}>
            <Form.Label>Option {index + 1}</Form.Label>
            <Form.Control 
              type="text" 
              value={option} 
              onChange={(e) => handleOptionChange(index, e.target.value)} 
              required 
            />
          </Form.Group>
        ))}
        <Form.Group>
          <Form.Label>Correct Answer Index</Form.Label>
          <Form.Control 
            as="select" 
            name="correctAnswerIndex"
            value={formData.correctAnswerIndex} 
            onChange={handleChange}
          >
            {formData.options.map((_, index) => (
              <option key={index} value={index}>{index + 1}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {question ? 'Update Question' : 'Create Question'}
        </Button>
        {question && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </Form>
    </div>
  );
}

export default QuestionForm;