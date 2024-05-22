import { type Request, type Response, type NextFunction } from "express";

const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
	res.status(500).render("error");
};
  
export default errorMiddleware;
