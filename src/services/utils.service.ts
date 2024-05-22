export const propareBearerToken = (token: string) => {
	try {
		const splitedToken = token.split(" ");

		if (splitedToken[0] !== "Bearer") {
			return "";
		}

		if (splitedToken[1]) {
			return splitedToken[1];
		}

		return "";
	} catch (error) {
		return "";
	}
};

export const getCurrentDateFormatted = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados, por lo que se suma 1
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};
