import { render, screen, waitFor, within } from "@testing-library/react";
import { HistoricTable } from "./index";
import { vi } from "vitest";
import { HistoricService } from "@/api/services/HistoricService";
import { Historic } from "@/api/models/Historic";
import { act } from "react-dom/test-utils";

vi.mock("axios");

describe("HistoricTable", () => {
	const mockHistoric: Historic[] = [
		{
			historicId: 1,
			historicCreatedAt: "23-05-2023",
			historicProduct: {
				productId: 1,
				productName: "Product 1",
				productDescription: "Product 1 description",
				productCategory: "Category 1",
				productSupplier: "Supplier 1",
				productAmount: 10,
				produtcUnitPrice: 10,
				productCreatedAt: "28-05-2023",
				productIsActive: true,
			},
			historicProductAmount: 5,
			historicStatus: "CREATED",
		},
		{
			historicId: 2,
			historicCreatedAt: "23-05-2023",
			historicProduct: {
				productId: 1,
				productName: "Product 2",
				productDescription: "Product 1 description",
				productCategory: "Category 1",
				productSupplier: "Supplier 1",
				productAmount: 5,
				produtcUnitPrice: 12,
				productCreatedAt: "28-05-2023",
				productIsActive: true,
			},
			historicProductAmount: 5,
			historicStatus: "EDITED",
		},
	];

	vi.spyOn(HistoricService, "getAll").mockResolvedValueOnce(mockHistoric);

	beforeEach(async () => {
		await act(async () => {
			render(<HistoricTable />);
		});
	});

	it("renders the correct header data", () => {
		const rows = screen.getAllByRole("row");
		const [name, operation] = rows[0].querySelectorAll("th");

		expect(name).toHaveTextContent("Data");
		expect(operation).toHaveTextContent("Operação");
	});

	it("renders table with historic data", () => {
		waitFor(() => {
			const productName1 = screen.getByText(/Product 1/);
			const productAmount1 = within(productName1.parentElement as HTMLElement).getByText(/\(10\)/);

			const productName2 = screen.getByText(/Product 2/);
			const productAmount2 = within(productName2.parentElement as HTMLElement).getByText(/\(5\)/);

			expect(productName1).toBeInTheDocument();
			expect(productAmount1).toBeInTheDocument();
			expect(productName2).toBeInTheDocument();
			expect(productAmount2).toBeInTheDocument();
		});
	});
});
