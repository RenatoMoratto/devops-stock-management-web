import { Product } from "./Product";

export type Historic = {
	historicId: number;
	historicCreatedAt: string;
	historicProduct: Product;
	historicProductAmount: number;
	historicStatus: "CREATED" | "DELETED" | "EDITED" | "UP" | "DOWN";
};
