import express, { Express } from 'express';
import { Server } from 'http';
import usersRouter from './users/users';

export default class App {
  app: Express;

  server!: Server;

  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  private useRoutes() {
    this.app.use('/users', usersRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server started at http://localhost:${this.port}`);
  }
}
