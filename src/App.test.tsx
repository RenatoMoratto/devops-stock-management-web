import { describe, expect, vi } from "vitest";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { ProductDto } from "./api/models/CreateProductDto";
import { ProductsService } from "./api/services/ProductsService";

vi.mock("axios");

describe("<App />", () => {
	it("App mounts properly", async () => {
		let wrapper;

		await act(async () => {
			wrapper = render(<App />);
		});

		expect(wrapper).toBeTruthy();
	});

	it("fetches and sets the product list", async () => {
		const mockProducts: ProductDto[] = [
			{
				id: "1",
				name: "Product 1",
				description: "Description 1",
				supplier: "Supplier 1",
				category: "Category 1",
				unitPrice: 10,
				amount: 20,
			},
			{
				id: "2",
				name: "Product 2",
				description: "Description 2",
				supplier: "Supplier 2",
				category: "Category 2",
				unitPrice: 5,
				amount: 15,
			},
		];

		vi.spyOn(ProductsService, "getAll").mockResolvedValueOnce(mockProducts);

		await act(async () => {
			render(<App />);
		});

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

	it("handles errors by showing a toast", async () => {
		const error = new Error("Failed to fetch products");

		vi.spyOn(ProductsService, "getAll").mockRejectedValueOnce(error);

		await act(async () => {
			render(<App />);
		});

		waitFor(() => {
			const errorToast = screen.getByText(/Failed to fetch products/);
			expect(errorToast).toBeInTheDocument();
		});
	});
});
