import App from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUsersController } from './users/users.controller.interface';
import { UsersService } from './users/users.service';
import { IUsersService } from './users/users.service.interface';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUsersController>(TYPES.UsersController).to(UsersController);
	bind<IUsersService>(TYPES.UsersService).to(UsersService);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
