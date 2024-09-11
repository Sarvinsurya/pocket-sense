import React from 'react';
import './Results.css';

const Results = ({ suggestion }) => {
  return (
    <div className="results-container">
      <h2>Suggested Investment Strategy:</h2>
      <p dangerouslySetInnerHTML={{ __html: suggestion }}></p>
      <button className="continue-button">CONTINUE</button>
    </div>
  );
};

export default Results;