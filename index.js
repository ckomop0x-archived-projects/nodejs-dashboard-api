import express from 'express';
// eslint-disable-next-line import/extensions
import usersRouter from './users/users.js';

const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
  console.log(req.cookie);
  console.log(res.cookie());
  next();
});

app.get('/hello', ((req, res) => {
  res.send('Hello from NodeJS Pure server');
}));

app.use('/users', usersRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
