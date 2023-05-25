import { api } from "@/api/core/api";
import { HistoricService } from "@/api/services/HistoricService";
import { vi } from "vitest";
import { Historic } from "../models/Historic";

describe("HistoricService", () => {
	describe("getAll", () => {
		it("should return array of Historic on success", async () => {
			const mockData: Array<Historic> = [
				{
					historicId: 1,
					historicCreatedAt: "23-05-2023",
					historicProduct: {
						productId: 1,
						productName: "Product 1",
						productDescription: "Product 1 description",
						productCategory: "Category 1",
						productSupplier: "Supplier 1",
						productAmount: 1,
						produtcUnitPrice: 10,
						productCreatedAt: "28-05-2023",
						productIsActive: true,
					},
					historicProductAmount: 5,
					historicStatus: "CREATED",
				},
			];
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
});
