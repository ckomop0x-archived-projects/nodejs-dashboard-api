import BaseController from "../common/base.controller";
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
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
    next(new HttpError(401, "Auth error", "login"));
  }

  logout(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "Logout");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "Register");
  }
}
