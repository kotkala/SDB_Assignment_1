import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function DisplayQuestion() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/questions/${id}`)
      .then(response => {
        setQuestion(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <h2>{question.text}</h2>
      <h4>Options:</h4>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <Link to={`/questions/${question._id}/edit`} className="btn btn-warning">Edit Question</Link>
    </div>
  );
}

export default DisplayQuestion;
