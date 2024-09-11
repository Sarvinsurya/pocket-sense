import React, { useState } from 'react';
import QuizForm from './components/QuizForm';
import Results from './components/Results';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="App">
      <h1>Pocket Sense Investment Quiz</h1>
      {!results ? (
        <QuizForm setResults={setResults} />
      ) : (
        <Results suggestion={results} />
      )}
    </div>
  );
}

export default App;