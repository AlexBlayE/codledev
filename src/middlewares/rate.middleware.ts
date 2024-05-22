import rateLimiter from "express-rate-limit";

function limiter(min: number, reqLimit: number) {
	return rateLimiter({ 
		windowMs: min * 60 * 1000,
		limit: reqLimit,
	});
}

export default limiter;
