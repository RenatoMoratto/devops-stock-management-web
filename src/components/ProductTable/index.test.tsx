import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ProductTable } from "./index";
import { ProductDto } from "@/api/models/CreateProductDto";
import { vi } from "vitest";
import { ProductsService } from "@/api/services/ProductsService";

const MOCK_PRODUCTS: ProductDto[] = [
	{
		id: "001",
		name: "T-shirt",
		description: "Cotton T-shirt for everyday use",
		category: "Clothing",
		amount: 100,
		unitPrice: 15.99,
		supplier: "ABC Clothing Co.",
	},
	{
		id: "002",
		name: "Backpack",
		description: "Lightweight backpack for outdoor activities",
		category: "Outdoor gear",
		amount: 50,
		unitPrice: 39.99,
		supplier: "DEF Gear Co.",
	},
	{
		id: "003",
		name: "Coffee Mug",
		description: "Ceramic coffee mug with a funny quote",
		category: "Kitchenware",
		amount: 200,
		unitPrice: 8.99,
		supplier: "GHI Housewares Co.",
	},
	{
		id: "004",
		name: "Bluetooth Speaker",
		description: "Portable wireless speaker with excellent sound quality",
		category: "Electronics",
		amount: 20,
		unitPrice: 79.99,
		supplier: "JKL Electronics Co.",
	},
	{
		id: "005",
		name: "Running Shoes",
		description: "Comfortable and durable running shoes for men",
		category: "Footwear",
		amount: 80,
		unitPrice: 129.99,
		supplier: "MNO Sports Co.",
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
		const [name, description, category, amount, unitPrice, supplier] = rows[0].querySelectorAll("th");

		expect(name).toHaveTextContent("Nome");
		expect(description).toHaveTextContent("Descrição");
		expect(category).toHaveTextContent("Categoria");
		expect(amount).toHaveTextContent("Quantidade");
		expect(unitPrice).toHaveTextContent("Valor unitário");
		expect(supplier).toHaveTextContent("Fornecedor");
	});

	it("renders the correct body data", () => {
		MOCK_PRODUCTS.forEach((item, i) => {
			const [name, description, category, amount, unitPrice, supplier, actions] =
				rows[i + 1].querySelectorAll("td");

			expect(name).toHaveTextContent(item.name);
			expect(description).toHaveTextContent(item.description);
			expect(category).toHaveTextContent(item.category);
			expect(amount).toHaveTextContent(item.amount.toString());
			expect(unitPrice).toHaveTextContent(`R$ ${item.unitPrice.toFixed(2).replace(".", ",")}`);
			expect(supplier).toHaveTextContent(item.supplier);
			expect(actions).toBeInTheDocument();
		});
	});

	it("remove row after delete product", async () => {
		const [name, description, category, amount, unitPrice, supplier, actions] = rows[1].querySelectorAll("td");
		const deleteButton = screen.getAllByRole("button", { name: /Excluir/ });

		fireEvent.click(deleteButton[0]);

		waitFor(() => {
			expect(name).not.toBeInTheDocument();
			expect(description).not.toBeInTheDocument();
			expect(category).not.toBeInTheDocument();
			expect(amount).not.toBeInTheDocument();
			expect(unitPrice).not.toBeInTheDocument();
			expect(supplier).not.toBeInTheDocument();
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
				name: MOCK_PRODUCTS[0].name,
				description: MOCK_PRODUCTS[0].description,
				category: MOCK_PRODUCTS[0].category,
				amount: String(MOCK_PRODUCTS[0].amount),
				unitPrice: String(MOCK_PRODUCTS[0].unitPrice),
				supplier: MOCK_PRODUCTS[0].supplier,
			});
		});
	});
});
