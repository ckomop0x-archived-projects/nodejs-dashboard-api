import App from "./app";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";

async function bootstrap() {
  const logger = new LoggerService();
  const usersController = new UsersController(logger);
  const exceptionFilter = new ExceptionFilter(logger);
  const app = new App(logger, usersController, exceptionFilter);
  await app.init();
}

bootstrap();
