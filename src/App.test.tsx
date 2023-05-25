import { describe, expect, vi } from "vitest";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { Product } from "./api/models/Product";
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
		const mockProducts: Product[] = [
			{
				productId: 1,
				productName: "Product 1",
				productDescription: "Product 1 description",
				productCategory: "Category 1",
				productSupplier: "Supplier 1",
				productAmount: 10,
				produtcUnitPrice: 10,
				productCreatedAt: "28-12-2023",
				productIsActive: true,
			},
			{
				productId: 2,
				productName: "Product 2",
				productDescription: "Product 2 description",
				productCategory: "Category 2",
				productSupplier: "Supplier 2",
				productAmount: 5,
				produtcUnitPrice: 20,
				productCreatedAt: "28-12-2023",
				productIsActive: true,
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
