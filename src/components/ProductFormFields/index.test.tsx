import { describe, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ProductFormFields, ProductFormRefType } from "./index";
import { ProductDto } from "@/api/models/ProductDto";

const productInitialValue: ProductDto = {
	productName: "",
	productDescription: "",
	productCategory: "",
	productSupplier: "",
	productAmount: 0,
	produtcUnitPrice: 0,
};

const product = {
	productName: "Product",
	productDescription: "Product description",
	productCategory: "Category",
	productSupplier: "Supplier",
	productAmount: 1,
	produtcUnitPrice: 10,
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
			productName: productInitialValue.productName,
			productDescription: productInitialValue.productDescription,
			productCategory: productInitialValue.productCategory,
			productSupplier: productInitialValue.productSupplier,
			productAmount: String(productInitialValue.productAmount),
			produtcUnitPrice: String(productInitialValue.produtcUnitPrice),
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

		fireEvent.change(nameInput, { target: { value: product.productName } });
		fireEvent.change(descriptionInput, { target: { value: product.productDescription } });
		fireEvent.change(categoryInput, { target: { value: product.productCategory } });
		fireEvent.change(amountInput, { target: { value: product.productAmount } });
		fireEvent.change(unitPriceInput, { target: { value: product.produtcUnitPrice } });
		fireEvent.change(supplierInput, { target: { value: product.productSupplier } });

		const fieldset = screen.getByTestId("product-form-fields");

		expect(fieldset).toHaveFormValues({
			productName: product.productName,
			productDescription: product.productDescription,
			productCategory: product.productCategory,
			productSupplier: product.productSupplier,
			productAmount: String(product.productAmount),
			produtcUnitPrice: String(product.produtcUnitPrice),
		});
	});
});
