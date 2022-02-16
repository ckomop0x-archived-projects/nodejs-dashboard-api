import 'reflect-metadata';
import BaseController from '../common/base.controller';
import { NextFunction, Response, Request } from 'express';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@injectable()
export class UsersController
	extends BaseController
	implements IUsersController
{
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private userService: UsersService,
	) {
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

	login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		next(new HttpError(401, 'Auth error', 'login'));
	}

	logout(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'Logout');
	}

	async register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(req.body);
		if (!result) return next(new HttpError(422, 'The user already exist'));
		// const newUser = new User(req.body.email, req.body.name);
		// await newUser.setPassword(req.body.password);
		// console.log(newUser);
		this.ok(res, { email: result.email });
	}
}
