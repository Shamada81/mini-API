import { Request, Response, NextFunction, Router } from "express";

type routerTypes = "get" | "post" | "delete" | "patch" | "put";

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, routerTypes>;
}