import { ProductDto } from "@/api/models/ProductDto";
import { ValidationError } from "@/api/models/ValidationError";
import { ProductsService } from "@/api/services/ProductsService";
import { api } from "../core/api";
import { vi } from "vitest";
import { AxiosError } from "axios";
import { Product } from "../models/Product";

const product: ProductDto = {
	productName: "Product",
	productDescription: "Product description",
	productCategory: "Category",
	productSupplier: "Supplier",
	productAmount: 1,
	produtcUnitPrice: 10,
};

const emptyProduct: ProductDto = {
	productName: "",
	productDescription: "",
	productCategory: "",
	productSupplier: "",
	productAmount: 0,
	produtcUnitPrice: 0,
};

describe("ProductsService", () => {
	describe("validate", () => {
		it("should return an empty array if the product is valid", () => {
			const errors: ValidationError[] = ProductsService.validate(product);

			expect(errors).toEqual([]);
		});

		it("should return an array with errors if the product is invalid", () => {
			const errors: ValidationError[] = ProductsService.validate(emptyProduct);

			expect(errors).toContainEqual({ name: "productName", message: "O nome é obrigatório." });
			expect(errors).toContainEqual({ name: "productDescription", message: "A descrição é obrigatório." });
			expect(errors).toContainEqual({ name: "productCategory", message: "A categoria é obrigatório." });
			expect(errors).toContainEqual({ name: "productSupplier", message: "O fornecedor é obrigatório." });
			expect(errors).toContainEqual({ name: "productAmount", message: "A quantidade é obrigatório." });
			expect(errors).toContainEqual({ name: "produtcUnitPrice", message: "O valor unitário é obrigatório." });
		});

		it("should validate if amount and unittPrice are lower or equals 0", () => {
			const errors: ValidationError[] = ProductsService.validate({
				productName: "Name",
				productDescription: "Description",
				productCategory: "Category",
				productSupplier: "Supplier",
				productAmount: -1,
				produtcUnitPrice: -5.99,
			});

			expect(errors).toContainEqual({
				name: "productAmount",
				message: "A quantidade deve conter um valor maior ou igual à 0(zero).",
			});
			expect(errors).toContainEqual({
				name: "produtcUnitPrice",
				message: "O valor unitário deve conter um valor maior que 0(zero).",
			});
		});
	});

	describe("getAll", () => {
		it("should return an array of products", async () => {
			const products: Product[] = [
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

			vi.spyOn(api, "get").mockResolvedValueOnce({ data: products });

			const result: ProductDto[] = await ProductsService.getAll();

			expect(result).toEqual(products);
		});

		it("should re-throw AxiosError on failure", async () => {
			vi.spyOn(api, "get").mockRejectedValueOnce(new AxiosError("Failed to get products"));

			await expect(ProductsService.getAll()).rejects.toThrow("Failed to get products");
		});

		it("should throw an error if the request fails", async () => {
			vi.spyOn(api, "get").mockRejectedValueOnce(new Error("Failed to get products"));

			await expect(ProductsService.getAll()).rejects.toThrow("Erro ao carregar produtos");
		});
	});

	describe("create", () => {
		it("should create a new product", async () => {
			const createdProductData = {
				id: "123456",
				...product,
			};

			const response = { data: createdProductData };

			vi.spyOn(api, "post").mockReturnValueOnce(Promise.resolve(response));

			const createdProduct = await ProductsService.create(product);

			expect(createdProduct).toEqual(createdProductData);
		});

		it("should throw an error if the API call fails", async () => {
			vi.spyOn(api, "post").mockRejectedValueOnce(new Error("API error"));
			vi.spyOn(api, "get").mockRejectedValueOnce(new Error("Failed to get products"));

			await expect(ProductsService.create(product)).rejects.toThrow("Erro ao salvar produto");
		});

		it("should re-throw AxiosError on failure", async () => {
			vi.spyOn(api, "post").mockRejectedValueOnce(new AxiosError("Failed to get products"));

			await expect(ProductsService.create(product)).rejects.toThrow("Failed to get products");
		});

		it("should throw an error when creating a product fails", async () => {
			vi.spyOn(api, "post").mockRejectedValueOnce(400);

			await expect(ProductsService.create(product)).rejects.toThrowError("Erro ao salvar produto");
		});
	});

	describe("update", () => {
		const productId = 2;

		it("should update an existing product", async () => {
			const updatedProductData = {
				productId,
				...product,
			};

			vi.spyOn(api, "get").mockResolvedValueOnce({ data: updatedProductData });
			vi.spyOn(api, "patch").mockResolvedValueOnce({ data: updatedProductData });

			const updatedProduct = await ProductsService.update(product, productId);

			expect(updatedProduct).toEqual(updatedProductData);
		});

		it("should re-throw AxiosError on failure", async () => {
			vi.spyOn(api, "get").mockResolvedValueOnce(product);
			vi.spyOn(api, "patch").mockRejectedValueOnce(new AxiosError("Failed to get products"));

			await expect(ProductsService.update(product, productId)).rejects.toThrow("Failed to get products");
		});

		it("should throw an error when updating a product fails", async () => {
			vi.spyOn(api, "get").mockResolvedValueOnce(product);
			vi.spyOn(api, "patch").mockRejectedValueOnce(new Error("API error"));

			await expect(ProductsService.update(product, productId)).rejects.toThrowError("Erro ao editar produto");
		});
	});

	describe("delete", () => {
		const productId = 1;

		it("should delete an existing product", async () => {
			const deletedProductData = {
				productId,
				...product,
			};

			vi.spyOn(api, "get").mockResolvedValueOnce({ data: deletedProductData });
			vi.spyOn(api, "delete").mockResolvedValueOnce({ data: deletedProductData });

			const updatedProduct = await ProductsService.delete(productId);

			expect(updatedProduct).toEqual(deletedProductData);
		});

		it("should re-throw AxiosError on failure", async () => {
			vi.spyOn(api, "get").mockResolvedValueOnce(product);
			vi.spyOn(api, "delete").mockRejectedValueOnce(new AxiosError("Failed to get products"));

			await expect(ProductsService.delete(productId)).rejects.toThrow("Failed to get products");
		});

		it("should throw an error when updating a product fails", async () => {
			vi.spyOn(api, "get").mockResolvedValueOnce(product);
			vi.spyOn(api, "delete").mockRejectedValueOnce(new Error("API error"));

			await expect(ProductsService.delete(productId)).rejects.toThrowError("Erro ao excluir produto");
		});
	});
});
