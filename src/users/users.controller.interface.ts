import { NextFunction, Request, Response, Router } from 'express';

export interface IUsersController {
	info(req: Request, res: Response, next: NextFunction): void;
	login(req: Request, res: Response, next: NextFunction): void;
	logout(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
	router: Router;
}
