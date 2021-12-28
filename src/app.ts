import express, { Express } from 'express';
import { Server } from 'http';
import usersRouter from './users/users';
import LoggerService from './logger/logger.service';

export default class App {
  app: Express;

  logger: LoggerService;

  server!: Server;

  port: number;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  private useRoutes() {
    this.app.use('/users', usersRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
