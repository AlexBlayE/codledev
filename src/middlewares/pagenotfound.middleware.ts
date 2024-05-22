import { type Request, type Response, type NextFunction } from "express";

const pageNotFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
	res.status(500).render("pagenotfound");
};
  
export default pageNotFoundMiddleware;
