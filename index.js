import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', ((req, res) => {
  res.send('Hello from NodeJS Pure server');
}));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
