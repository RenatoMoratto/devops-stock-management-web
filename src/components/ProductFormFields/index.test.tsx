import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProductFormFields } from "./index";

const productInitialValue = {
	id: undefined,
	name: "",
	description: "",
	category: "",
	amount: 0,
	unitPrice: 0,
	supplier: "",
};

describe("ProductFormFields", () => {
	beforeEach(() => {
		render(
			<form data-testid="product-form-fields">
				<ProductFormFields initialValue={productInitialValue} />
			</form>
		);
	});

	it("renders the correct fields with initial values ", () => {
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

		const fieldset = screen.getByTestId("product-form-fields");

		expect(fieldset).toHaveFormValues({
			name: "T-shirt",
			description: "Cotton T-shirt for everyday use",
			category: "Clothing",
			amount: "100",
			unitPrice: "15.99",
			supplier: "ABC Clothing Co.",
		});
	});
});
