export const useMask = () => ({
	toBRL: (value: number) => {
		const formattedNumber = new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);

		return formattedNumber;
	},
});
