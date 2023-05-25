import { isAxiosError } from "axios";
import { api } from "@/api/core/api";
import { Historic } from "@/api/models/Historic";

export class HistoricService {
	public static async getAll(): Promise<Array<Historic>> {
		try {
			const response = await api.get<Array<Historic>>("/historic");

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw new Error("Erro ao carregar histórico");
		}
	}
}
