import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/questions')
            .then(res => setQuestions(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleAnswer = (answer) => {
        if (answer === questions[index].answer) {
            setScore(score + 1);
        }
        setIndex(index + 1);
    };

    return (
        <div>
            {index < questions.length ? (
                <div>
                    <h2>{questions[index].question}</h2>
                    {questions[index].options.map((option, i) => (
                        <button key={i} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <h2>Quiz Completed! Your Score: {score}</h2>
            )}
        </div>
    );
};

export default Quiz;
