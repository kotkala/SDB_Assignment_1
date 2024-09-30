import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function QuizForm({ quiz, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>{quiz ? 'Edit Quiz' : 'Create New Quiz'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            name="title"
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            name="description"
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {quiz ? 'Update Quiz' : 'Create Quiz'}
        </Button>
        {quiz && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </Form>
    </div>
  );
}

export default QuizForm;