import { describe, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddProductModal } from "./index";
import { ProductsService } from "@/api/services/ProductsService";

const product = {
	name: "T-shirt",
	description: "Cotton T-shirt for everyday use",
	category: "Clothing",
	amount: 100,
	unitPrice: 15.99,
	supplier: "ABC Clothing Co.",
};

describe("AddProductModal", () => {
	const onClose = vi.fn();
	const fetchProducts = vi.fn();

	beforeEach(() => {
		render(<AddProductModal isOpen={true} onClose={onClose} fetchProducts={fetchProducts} />);
	});

	it("renders the correct title", () => {
		const title = screen.getByText("Novo Produto");
		expect(title).toBeInTheDocument();
	});

	it("renders the correct form fields ", () => {
		const form = screen.getByTestId("add-product-form");

		expect(form).toHaveFormValues({
			name: "",
			description: "",
			category: "",
			amount: "0",
			unitPrice: "0",
			supplier: "",
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

		const form = screen.getByTestId("add-product-form");

		expect(form).toHaveFormValues({ ...product, amount: "100", unitPrice: "15.99" });
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

	it("should show error message if submit fails", async () => {
		const errorMessage = "Create failed";

		vi.spyOn(ProductsService, "create").mockRejectedValueOnce(new Error(errorMessage));

		fireEvent.submit(screen.getByTestId("add-product-form"));

		waitFor(() => {
			expect(ProductsService.create).toHaveBeenCalledWith(product);
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});
	});

	it("should not call handleEditProduct when form is invalid", async () => {
		vi.spyOn(ProductsService, "create").mockResolvedValueOnce(product);

		const nameInput = screen.getByRole("textbox", { name: "Nome" });

		fireEvent.change(nameInput, { target: { value: "" } });

		const submitButton = screen.getByRole("button", { name: "Salvar" });

		fireEvent.click(submitButton);

		waitFor(() => {
			expect(ProductsService.create).not.toHaveBeenCalledWith({ product, name: "" });
			expect(fetchProducts).not.toHaveBeenCalled();
			expect(onClose).not.toHaveBeenCalled();
		});
	});
});
