import { describe, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ProductFormFields, ProductFormRefType } from "./index";

const productInitialValue = {
	id: undefined,
	name: "",
	description: "",
	category: "",
	amount: 0,
	unitPrice: 0,
	supplier: "",
};

const product = {
	name: "T-shirt",
	description: "Cotton T-shirt for everyday use",
	category: "Clothing",
	amount: 100,
	unitPrice: 15.99,
	supplier: "ABC Clothing Co.",
};

describe("ProductFormFields", () => {
	it("renders the correct fields with initial values ", () => {
		render(
			<form data-testid="product-form-fields">
				<ProductFormFields initialValue={productInitialValue} />
			</form>
		);

		const fieldset = screen.getByTestId("product-form-fields");

		expect(fieldset).toHaveFormValues({
			name: productInitialValue.name,
			description: productInitialValue.description,
			category: productInitialValue.category,
			amount: String(productInitialValue.amount),
			unitPrice: String(productInitialValue.unitPrice),
			supplier: productInitialValue.supplier,
		});
	});

	it("update form field values ", () => {
		render(
			<form data-testid="product-form-fields">
				<ProductFormFields initialValue={productInitialValue} />
			</form>
		);

		const nameInput = screen.getByRole("textbox", { name: "Nome" });
		const descriptionInput = screen.getByRole("textbox", { name: "Descrição" });
		const categoryInput = screen.getByRole("textbox", { name: "Categoria" });
		const amountInput = screen.getByRole("spinbutton", { name: "Quantidade" });
		const unitPriceInput = screen.getByRole("spinbutton", { name: "Valor unitário" });
		const supplierInput = screen.getByRole("textbox", { name: "Fornecedor" });

		fireEvent.change(nameInput, { target: { value: product.name } });
		fireEvent.change(descriptionInput, { target: { value: product.description } });
		fireEvent.change(categoryInput, { target: { value: product.category } });
		fireEvent.change(amountInput, { target: { value: product.amount } });
		fireEvent.change(unitPriceInput, { target: { value: product.unitPrice } });
		fireEvent.change(supplierInput, { target: { value: product.supplier } });

		const fieldset = screen.getByTestId("product-form-fields");

		expect(fieldset).toHaveFormValues({
			name: product.name,
			description: product.description,
			category: product.category,
			amount: String(product.amount),
			unitPrice: String(product.unitPrice),
			supplier: product.supplier,
		});
	});
});
