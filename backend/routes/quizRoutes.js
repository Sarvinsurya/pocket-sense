const express = require('express');
const router = express.Router();
const { getInvestmentSuggestion } = require('../ml/investmentModel');

router.post('/', async (req, res) => {
  try {
    const quizData = req.body;
    const suggestion = await getInvestmentSuggestion(quizData);
    res.status(201).json({ suggestion });
  } catch (error) {
    res.status(400).json({ message: 'Error', error: error.toString() });
  }
});

module.exports = router;