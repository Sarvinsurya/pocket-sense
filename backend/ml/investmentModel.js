const { spawn } = require('child_process');

function getInvestmentSuggestion(quizData) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['ml/investmentModel.py', JSON.stringify(quizData)]);
    
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();  // This will capture the formatted output with newlines.
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Python process exited with code ${code}`);
      } else {
        resolve(result.trim());  // Resolve the result to remove extra spaces.
      }
    });
  });
}

module.exports = { getInvestmentSuggestion };
