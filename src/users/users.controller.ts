import BaseController from '../common/base.controller';
import { NextFunction, Response, Request } from 'express';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';

@injectable()
export class UsersController
	extends BaseController
	implements IUsersController
{
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
			{
				path: '/logout',
				method: 'post',
				func: this.logout,
			},
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HttpError(401, 'Auth error', 'login'));
	}

	logout(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'Logout');
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'Register');
	}
}
