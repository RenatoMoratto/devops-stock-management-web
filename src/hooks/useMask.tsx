function isDateInvalid(dateString: string): boolean {
	const date = new Date(dateString);
	return date.toString() === "Invalid Date";
}

export const useMask = () => ({
	toBRL: (value: number) => {
		const formattedNumber = new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);

		return formattedNumber;
	},
	toDate: (value: string) => {
		if (isDateInvalid(value)) {
			return "";
		}

		const date = new Date(value);
		return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
	},
	toDatetime: (value: string) => {
		if (isDateInvalid(value)) {
			return "";
		}

		const date = new Date(value);
		return date.toLocaleTimeString("pt-BR", { timeStyle: "short" });
	},
});
