import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

export default class App {
  app: Express;

  logger: LoggerService;
  usersController: UsersController;

  server!: Server;

  port: number;

  constructor(logger: LoggerService, usersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
  }

  private useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
