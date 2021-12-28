import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './users/users.js';

const port = 8000;
const app = express();

app.use(((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
}));

app.get('/hello', ((req, res) => {
  throw new Error('Errror!!!');
}));

app.use('/users', usersRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
