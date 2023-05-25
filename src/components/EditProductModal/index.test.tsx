import { describe, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EditProductModal } from "./index";
import { ProductsService } from "@/api/services/ProductsService";
import { Product } from "@/api/models/Product";
import { ProductDto } from "@/api/models/ProductDto";

const productReturn: Product = {
	productId: 1,
	productName: "Product 1",
	productDescription: "Product 1 description",
	productCategory: "Category 1",
	productSupplier: "Supplier 1",
	productAmount: 1,
	produtcUnitPrice: 10,
	productCreatedAt: "28-05-2023",
	productIsActive: true,
};

const product: ProductDto = {
	productName: "Product 1",
	productDescription: "Product 1 description",
	productCategory: "Category 1",
	productSupplier: "Supplier 1",
	productAmount: 1,
	produtcUnitPrice: 10,
};

const productInitialValue = {
	productId: 0,
	productName: "",
	productDescription: "",
	productCategory: "",
	productSupplier: "",
	productAmount: 0,
	produtcUnitPrice: 0,
	productCreatedAt: "",
	productIsActive: true,
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
			productName: productInitialValue.productName,
			productDescription: productInitialValue.productDescription,
			productCategory: productInitialValue.productCategory,
			productAmount: String(productInitialValue.productAmount),
			produtcUnitPrice: String(productInitialValue.produtcUnitPrice),
			productSupplier: productInitialValue.productSupplier,
		});
	});

	it("update form field values ", () => {
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

		const form = screen.getByTestId("edit-product-form");

		const productExpected = {
			...product,
			productAmount: product.productAmount.toString(),
			produtcUnitPrice: product.produtcUnitPrice.toString(),
		};

		expect(form).toHaveFormValues(productExpected);
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

	it("closes after submit the form", async () => {
		const submitButton = screen.getByRole("button", { name: /salvar/i });
		vi.spyOn(ProductsService, "update").mockResolvedValueOnce(productReturn);

		fireEvent.click(submitButton);

		waitFor(() => expect(onClose).toHaveBeenCalledOnce());
	});

	test("should update a product on submit", () => {
		vi.spyOn(ProductsService, "update").mockResolvedValueOnce(productReturn);

		fireEvent.submit(screen.getByTestId("edit-product-form"));

		waitFor(() => {
			expect(ProductsService.update).toHaveBeenCalledWith(productReturn, productReturn.productId);
			expect(fetchProducts).toHaveBeenCalled();
			expect(onClose).toHaveBeenCalled();
		});
	});

	it("renders loading while submitting the form", async () => {
		const submitButton = screen.getByRole("button", { name: /salvar/i });
		vi.spyOn(ProductsService, "update").mockResolvedValueOnce(productReturn);

		fireEvent.click(submitButton);

		waitFor(() => {
			expect(submitButton).toBeDisabled();
		});
	});

	it("should show error message if submit fails", async () => {
		const errorMessage = "Update failed";

		vi.spyOn(ProductsService, "update").mockRejectedValueOnce(new Error(errorMessage));

		fireEvent.submit(screen.getByTestId("edit-product-form"));

		waitFor(() => {
			expect(ProductsService.update).toHaveBeenCalledWith(productReturn, productReturn.productId);
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});
	});

	it("should not call handleEditProduct when form is invalid", async () => {
		vi.spyOn(ProductsService, "update").mockResolvedValueOnce(productReturn);
		const nameInput = screen.getByRole("textbox", { name: "Nome" });

		fireEvent.change(nameInput, { target: { value: "" } });

		const submitButton = screen.getByRole("button", { name: "Salvar" });

		fireEvent.click(submitButton);

		waitFor(() => {
			expect(ProductsService.update).not.toHaveBeenCalledWith(
				{ ...productReturn, productName: "" },
				productReturn.productId
			);
			expect(fetchProducts).not.toHaveBeenCalled();
			expect(onClose).not.toHaveBeenCalled();
		});
	});
});
