import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function DisplayQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/quizzes/${quizId}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.log(error));
  }, [quizId]);

  return (
    <div>
      {quiz ? (
        <>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <h3>Questions:</h3>
          <ul>
            {quiz.questions.map(question => (
              <li key={question._id}>{question.text}</li>
            ))}
          </ul>
          <Link to={`/quizzes/${quizId}/edit`}>Edit Quiz</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DisplayQuiz;
