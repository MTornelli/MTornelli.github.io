const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });
    res.json(completion.data.choices[0].message.content);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error communicating with OpenAI');
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
