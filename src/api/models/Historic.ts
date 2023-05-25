import { Product } from "./Product";

export type Historic = {
	historicId: number;
	historicCreatedAt: string;
	productName: string;
	ProductAmount: number;
	historicStatus: "CREATED" | "DELETED" | "EDITED" | "UP" | "DOWN";
};
