import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProductTable } from "./index";
import { vi } from "vitest";
import { ProductsService } from "@/api/services/ProductsService";
import { Product } from "@/api/models/Product";

const MOCK_PRODUCTS: Product[] = [
	{
		productId: 1,
		productName: "Product 1",
		productDescription: "Product 1 description",
		productCategory: "Category 1",
		productSupplier: "Supplier 1",
		productAmount: 1,
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
		productAmount: 2,
		produtcUnitPrice: 20,
		productCreatedAt: "28-12-2023",
		productIsActive: true,
	},
];

describe("ProductTable", () => {
	let rows: HTMLElement[];
	const handleDelete = vi.fn();

	beforeEach(() => {
		render(<ProductTable data={MOCK_PRODUCTS} isLoading={false} fetchProducts={handleDelete} />);
		rows = screen.getAllByRole("row");
	});

	it("renders the correct number of rows", () => {
		expect(rows).toHaveLength(MOCK_PRODUCTS.length + 1);
	});

	it("renders the correct header data", () => {
		const [productName, productDescription, productCategory, productAmount, produtcUnitPrice, productSupplier] =
			rows[0].querySelectorAll("th");

		expect(productName).toHaveTextContent("Nome");
		expect(productDescription).toHaveTextContent("Descrição");
		expect(productCategory).toHaveTextContent("Categoria");
		expect(productAmount).toHaveTextContent("Quantidade");
		expect(produtcUnitPrice).toHaveTextContent("Valor unitário");
		expect(productSupplier).toHaveTextContent("Fornecedor");
	});

	it("renders the correct body data", () => {
		MOCK_PRODUCTS.forEach((item, i) => {
			const [
				productName,
				productDescription,
				productCategory,
				productAmount,
				produtcUnitPrice,
				productSupplier,
				actions,
			] = rows[i + 1].querySelectorAll("td");

			expect(productName).toHaveTextContent(item.productName);
			expect(productDescription).toHaveTextContent(item.productDescription);
			expect(productCategory).toHaveTextContent(item.productCategory);
			expect(productAmount).toHaveTextContent(item.productAmount.toString());
			expect(produtcUnitPrice).toHaveTextContent(`R$ ${item.produtcUnitPrice.toFixed(2).replace(".", ",")}`);
			expect(productSupplier).toHaveTextContent(item.productSupplier);
			expect(actions).toBeInTheDocument();
		});
	});

	it("remove row after delete product", async () => {
		const [
			productName,
			productDescription,
			productCategory,
			productAmount,
			produtcUnitPrice,
			productSupplier,
			actions,
		] = rows[1].querySelectorAll("td");
		const deleteButton = screen.getAllByRole("button", { name: /Excluir/ });

		fireEvent.click(deleteButton[0]);

		waitFor(() => {
			expect(productName).not.toBeInTheDocument();
			expect(productDescription).not.toBeInTheDocument();
			expect(productCategory).not.toBeInTheDocument();
			expect(productAmount).not.toBeInTheDocument();
			expect(produtcUnitPrice).not.toBeInTheDocument();
			expect(productSupplier).not.toBeInTheDocument();
			expect(actions).not.toBeInTheDocument();
		});
	});

	it("handle delete error by showing a toast", async () => {
		const error = new Error("Failed to delete product");

		vi.spyOn(ProductsService, "delete").mockRejectedValueOnce(error);

		const deleteButton = screen.getAllByRole("button", { name: /Excluir/ });

		fireEvent.click(deleteButton[0]);

		const errorToast = await document.querySelector("");
		expect(errorToast).toBeInTheDocument();
	});

	it("renders modal with row content on edit", async () => {
		const editButton = screen.getAllByRole("button", { name: /Editar/ });

		fireEvent.click(editButton[0]);

		waitFor(() => {
			const modalTitle = screen.getByText("Editar produto");
			expect(modalTitle).toBeInTheDocument();

			const form = screen.getByTestId("edit-product-form");

			expect(form).toHaveFormValues({
				productName: MOCK_PRODUCTS[0].productName,
				productDescription: MOCK_PRODUCTS[0].productDescription,
				productCategory: MOCK_PRODUCTS[0].productCategory,
				productAmount: String(MOCK_PRODUCTS[0].productAmount),
				produtcUnitPrice: String(MOCK_PRODUCTS[0].produtcUnitPrice),
				productSupplier: MOCK_PRODUCTS[0].productSupplier,
			});
		});
	});
});
