import { Server } from "http";
import express, { Express } from "express";
import { UserController } from './users/user.controller';
import { LoggerService } from "./logger/logger.service";
import { ExeptionFilter } from './errors/exertion.filter';

export class App {
	app: Express;
	port: number;
	server: Server;
	logger: LoggerService;
	userController: UserController;
	exeptionFilter: ExeptionFilter;

	constructor(
		logger: LoggerService,
		userController: UserController,
		exeptionFilter: ExeptionFilter
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
	}

	public async init() {
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
	}

	useRoutes() {
		this.app.use("/users", this.userController.router);
	}

	useExeptionFilters() {
		const handlerBinding = this.exeptionFilter.catch.bind(this.exeptionFilter);
		this.app.use(handlerBinding);
	}
}