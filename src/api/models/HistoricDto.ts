export type HistoricDto = {
	id?: string;
	createdAt?: string;
	productName: string;
	amount?: number;
	status: "CREATED" | "DELETED" | "EDITED" | "UP" | "DOWN";
};
