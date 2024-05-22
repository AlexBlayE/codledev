import { NextFunction, type Request, type Response } from "express";

async function noScript(req: Request, res: Response, next: NextFunction) {
	const deniedExpression = new RegExp(/<script>.*<\/script>/g);
	const name = req.body.name as string;

	if (name.match(deniedExpression)) {
		res.json({
			res: "No this name"
		});
	} else {
		next();
	}
}

export default noScript;
