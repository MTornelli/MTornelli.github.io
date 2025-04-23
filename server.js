const express = require('express');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: message }],
});

    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error communicating with OpenAI');
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
