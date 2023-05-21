import { isAxiosError } from "axios";
import { api } from "@/api/core/api";
import { HistoricDto } from "@/api/models/HistoricDto";

export class HistoricService {
	public static async getAll(): Promise<Array<HistoricDto>> {
		try {
			const response = await api.get<Array<HistoricDto>>("/historic");

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw new Error("Erro ao carregar histórico");
		}
	}

	public static async create(data: HistoricDto): Promise<HistoricDto> {
		try {
			const response = await api.post<HistoricDto>("/historic", data);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error.message;
			}
			throw new Error("Erro ao salvar alteração");
		}
	}
}
