import { readFileSync } from "fs";

let jwtSecret: string;

export const getJwtSecret = (): string => {
	if (!jwtSecret) {
		jwtSecret = readFileSync(process.env.JWT_SECRET_PATH as string, { encoding: "utf-8" });
	}
	return jwtSecret;
};
