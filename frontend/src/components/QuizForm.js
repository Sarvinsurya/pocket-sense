import React, { useState } from 'react';
import './QuizForm.css';

const questions = [
  "What is your primary financial goal?",
  "How much are you ready to invest initially?",
  "What kind of returns are you expecting?",
  "How long are you willing to keep your investment?",
  "What is your risk tolerance when it comes to investing?",
  "In what asset classes are you most interested in investing?",
  "How frequently do you want to review your investments?",
  "How do you typically respond to market downturns?"
];

const options = [
  ["Saving for retirement", "Buying a house", "Building wealth through investing", "Saving for short-term goals"],
  ["Less than ₹10,000", "₹10,000 - ₹1,00,000", "₹1,00,000 - ₹5,00,000", "More than ₹5,00,000"],
  ["Less than 5%", "5-10%", "10-20%", "More than 20%"],
  ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"],
  ["Low", "Moderate", "High", "Very high"],
  ["Stocks", "Bonds", "Mutual Funds", "Real Estate"],
  ["Rarely", "Once a year", "A few times a year", "Regularly"],
  ["Sell", "Wait it out", "Hold", "Buy more"]
];

const QuizForm = ({ setResults }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (option, index) => {
    setSelectedOption(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAnswers = [...answers, options[currentQuestion][selectedOption]];
    setAnswers(updatedAnswers);
    setSelectedOption(null); // Clear the selected option
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnswers)
      })
        .then(response => response.json())
        .then(data => setResults(data.suggestion))
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Investment IQ Quiz #{currentQuestion + 1}</h2>
        <button className="close-button">X</button>
      </div>
      <form onSubmit={handleSubmit} className="quiz-form">
        <h3>{questions[currentQuestion]}</h3>
        <div className="options">
          {options[currentQuestion].map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option, index)}
            >
              <span className="option-label">{String.fromCharCode(65 + index)}</span> {option}
            </div>
          ))}
        </div>
        <div className="footer">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
          <span>{currentQuestion + 1}/{questions.length}</span>
          <button type="submit" className="continue-button" disabled={selectedOption === null}>
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
