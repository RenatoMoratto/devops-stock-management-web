import { render, screen, waitFor, within } from "@testing-library/react";
import { HistoricTable } from "./index";
import { vi } from "vitest";
import { HistoricService } from "@/api/services/HistoricService";
import { HistoricDto } from "@/api/models/HistoricDto";
import { act } from "react-dom/test-utils";

vi.mock("axios");

describe("HistoricTable", () => {
	const mockHistoric: HistoricDto[] = [
		{
			id: "1",
			createdAt: "2022-04-11T15:20:00.000Z",
			status: "CREATED",
			productName: "Product 1",
			amount: 10,
		},
		{
			id: "2",
			createdAt: "2022-04-12T10:30:00.000Z",
			status: "EDITED",
			productName: "Product 2",
			amount: 5,
		},
	];

	vi.spyOn(HistoricService, "getAll").mockResolvedValueOnce(mockHistoric);

	beforeEach(() => {
		act(() => render(<HistoricTable />));
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
