import express, { Express } from 'express';
import { Server } from 'http';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUsersController } from './users/users.controller.interface';
import { json } from 'body-parser';

@injectable()
export default class App {
	app: Express;
	port: number;
	server!: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: IUsersController,
		@inject(TYPES.ExceptionFilter)
		private readonly exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	private useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started at http://localhost:${this.port}`);
	}
}
