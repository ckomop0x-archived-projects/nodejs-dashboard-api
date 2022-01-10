import BaseController from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { NextFunction, Response, Request } from "express";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
      {
        path: "/logout",
        method: "post",
        func: this.logout,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "Login");
  }

  logout(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "Logout");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "Register");
  }
}
