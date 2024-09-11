const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const quizRoutes = require('./routes/quizRoutes');
app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});