import { NextFunction, type Request, type Response } from "express";
import Joi from "joi";

function bodyValidator(schema: Joi.ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = schema.validate(req.body);

		if (result.error) {
			res.status(400).json({
				"error": result.error.details[0].message
			});
		} else {
			next();
		}
	};
} 

export default bodyValidator;
