import { describe, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EditProductModal } from "./index";

const productInitialValue = {
	id: undefined,
	name: "",
	description: "",
	category: "",
	amount: 0,
	unitPrice: 0,
	supplier: "",
};

describe("AddProductModal", () => {
	const onClose = vi.fn();
	const fetchProducts = vi.fn();

	beforeEach(() => {
		render(
			<EditProductModal
				isOpen={true}
				onClose={onClose}
				fetchProducts={fetchProducts}
				product={productInitialValue}
			/>
		);
	});

	it("renders the correct title", () => {
		const title = screen.getByText("Novo Produto");
		expect(title).toBeInTheDocument();
	});

	it("renders the correct form fields ", () => {
		const form = screen.getByTestId("edit-product-form");

		expect(form).toHaveFormValues({
			name: productInitialValue.name,
			description: productInitialValue.description,
			category: productInitialValue.category,
			amount: String(productInitialValue.amount),
			unitPrice: String(productInitialValue.unitPrice),
			supplier: productInitialValue.supplier,
		});
	});

	it("update form field values ", () => {
		const nameInput = screen.getByRole("textbox", { name: "Nome" });
		const descriptionInput = screen.getByRole("textbox", { name: "Descrição" });
		const categoryInput = screen.getByRole("textbox", { name: "Categoria" });
		const amountInput = screen.getByRole("spinbutton", { name: "Quantidade" });
		const unitPriceInput = screen.getByRole("spinbutton", { name: "Valor unitário" });
		const supplierInput = screen.getByRole("textbox", { name: "Fornecedor" });

		fireEvent.change(nameInput, { target: { value: "T-shirt" } });
		fireEvent.change(descriptionInput, { target: { value: "Cotton T-shirt for everyday use" } });
		fireEvent.change(categoryInput, { target: { value: "Clothing" } });
		fireEvent.change(amountInput, { target: { value: 100 } });
		fireEvent.change(unitPriceInput, { target: { value: 15.99 } });
		fireEvent.change(supplierInput, { target: { value: "ABC Clothing Co." } });

		const form = screen.getByTestId("edit-product-form");

		expect(form).toHaveFormValues({
			name: "T-shirt",
			description: "Cotton T-shirt for everyday use",
			category: "Clothing",
			amount: "100",
			unitPrice: "15.99",
			supplier: "ABC Clothing Co.",
		});
	});

	it("closes on close button click", () => {
		const closeButton = screen.getByRole("button", { name: /Cancelar/ });

		fireEvent.click(closeButton);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("saves new product on save button click", () => {
		const submitButton = screen.getByRole("button", { name: "Salvar" });
		const toast = vi.fn();

		fireEvent.click(submitButton);
		waitFor(() => expect(toast).toHaveBeenCalledWith({ status: "success", title: "Produto criado com sucesso." }));
	});
});
