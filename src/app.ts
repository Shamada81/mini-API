import { Server } from "http";
import express, { Express } from "express";
import { usersRouter } from './users/users';
import { LoggerService } from "./logger/logger.service";

export class App {
	app: Express;
	port: number;
	server: Server;
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
	}

	public async init() {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
	}

	useRoutes() {
		this.app.use("/users", usersRouter);
	}
}