import { api } from "@/api/core/api";
import { HistoricDto } from "@/api/models/HistoricDto";
import { HistoricService } from "@/api/services/HistoricService";
import { AxiosError } from "axios";
import { vi } from "vitest";

describe("HistoricService", () => {
	describe("getAll", () => {
		it("should return array of HistoricDto on success", async () => {
			const mockData = [{ id: 1, name: "Historic 1" }];
			const apiSpy = vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockData });

			const result = await HistoricService.getAll();

			expect(apiSpy).toHaveBeenCalledWith("/historic");
			expect(result).toEqual(mockData);
		});

		it("should throw error message on failure", async () => {
			const apiSpy = vi.spyOn(api, "get").mockRejectedValueOnce("Error");

			await expect(HistoricService.getAll()).rejects.toEqual("Erro ao carregar histórico");
			expect(apiSpy).toHaveBeenCalledWith("/historic");
		});

		it("should re-throw AxiosError on failure", async () => {
			const axiosError = { isAxiosError: true, message: "Error" };
			const apiSpy = vi.spyOn(api, "get").mockRejectedValueOnce(axiosError);

			await expect(HistoricService.getAll()).rejects.toEqual(axiosError);
			expect(apiSpy).toHaveBeenCalledWith("/historic");
		});
	});

	describe("create", () => {
		const historicData: HistoricDto = { id: "1", productName: "Historic 1", status: "CREATED", amount: 10 };

		it("should return created HistoricDto on success", async () => {
			const apiSpy = vi.spyOn(api, "post").mockResolvedValueOnce({ data: historicData });

			const result = await HistoricService.create(historicData);

			expect(apiSpy).toHaveBeenCalledWith("/historic", historicData);
			expect(result).toEqual(historicData);
		});

		it("should throw error message on failure", async () => {
			const apiSpy = vi.spyOn(api, "post").mockRejectedValueOnce("Error");

			await expect(HistoricService.create(historicData)).rejects.toEqual("Erro ao salvar alteração");
			expect(apiSpy).toHaveBeenCalledWith("/historic", historicData);
		});

		it("should re-throw AxiosError on failure", async () => {
			const apiSpy = vi.spyOn(api, "post").mockRejectedValueOnce(new AxiosError("Error"));

			await expect(HistoricService.create(historicData)).rejects.toEqual("Error");
			expect(apiSpy).toHaveBeenCalledWith("/historic", historicData);
		});
	});
});
