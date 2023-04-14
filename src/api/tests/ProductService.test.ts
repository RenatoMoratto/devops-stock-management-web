import { ProductDto } from "@/api/models/ProductDto";
import { ValidationError } from "@/api/models/ValidationError";
import { ProductsService } from "@/api/services/ProductsService";
import { api } from "../core/api";
import { vi } from "vitest";
import { AxiosError } from "axios";

const product: ProductDto = {
	name: "Product",
	description: "Product description",
	category: "Category",
	supplier: "Supplier",
	amount: 1,
	unitPrice: 10,
};

const emptyProduct: ProductDto = {
	name: "",
	description: "",
	category: "",
	supplier: "",
	amount: 0,
	unitPrice: 0,
};

describe("ProductsService", () => {
	describe("validate", () => {
		it("should return an empty array if the product is valid", () => {
			const errors: ValidationError[] = ProductsService.validate(product);

			expect(errors).toEqual([]);
		});

		it("should return an array with errors if the product is invalid", () => {
			const errors: ValidationError[] = ProductsService.validate(emptyProduct);

			expect(errors).toContainEqual({ name: "name", message: "O nome é obrigatório." });
			expect(errors).toContainEqual({ name: "description", message: "A descrição é obrigatório." });
			expect(errors).toContainEqual({ name: "category", message: "A categoria é obrigatório." });
			expect(errors).toContainEqual({ name: "supplier", message: "O fornecedor é obrigatório." });
			expect(errors).toContainEqual({ name: "amount", message: "A quantidade é obrigatório." });
			expect(errors).toContainEqual({ name: "unitPrice", message: "O valor unitário é obrigatório." });
		});

		it("should validate if amount and unittPrice are lower or equals 0", () => {
			const errors: ValidationError[] = ProductsService.validate({
				name: "Name",
				description: "Description",
				category: "Category",
				supplier: "Supplier",
				amount: -1,
				unitPrice: -5.99,
			});

			expect(errors).toContainEqual({
				name: "amount",
				message: "A quantidade deve conter um valor maior ou igual à 0(zero).",
			});
			expect(errors).toContainEqual({
				name: "unitPrice",
				message: "O valor unitário deve conter um valor maior que 0(zero).",
			});
		});
	});

	describe("getAll", () => {
		it("should return an array of products", async () => {
			const products: ProductDto[] = [
				{
					id: "1",
					name: "Product 1",
					description: "Product 1 description",
					category: "Category 1",
					supplier: "Supplier 1",
					amount: 1,
					unitPrice: 10,
				},
				{
					id: "2",
					name: "Product 2",
					description: "Product 2 description",
					category: "Category 2",
					supplier: "Supplier 2",
					amount: 2,
					unitPrice: 20,
				},
			];

			vi.spyOn(api, "get").mockResolvedValueOnce({ data: products });

			const result: ProductDto[] = await ProductsService.getAll();

			expect(result).toEqual(products);
		});

		it("should throw an axios error if the request fails with axios error", async () => {
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

		it("should throw an axios error if the request fails with axios error", async () => {
			vi.spyOn(api, "post").mockRejectedValueOnce(new AxiosError("Failed to get products"));

			await expect(ProductsService.create(product)).rejects.toThrow("Failed to get products");
		});

		it("should throw an error when creating a product fails", async () => {
			vi.spyOn(api, "post").mockRejectedValueOnce(400);

			await expect(ProductsService.create(product)).rejects.toThrowError("Erro ao salvar produto");
		});
	});

	describe("update", () => {
		const productId = "123456";

		it("should update an existing product", async () => {
			const updatedProductData = {
				id: productId,
				...product,
			};

			vi.spyOn(api, "get").mockResolvedValueOnce({ data: updatedProductData });
			vi.spyOn(api, "put").mockResolvedValueOnce({ data: updatedProductData });

			const updatedProduct = await ProductsService.update(product, productId);

			expect(updatedProduct).toEqual(updatedProductData);
		});

		it("should throw an axios error if the request fails with axios error", async () => {
            vi.spyOn(api, "get").mockResolvedValueOnce(product);
			vi.spyOn(api, "put").mockRejectedValueOnce(new AxiosError("Failed to get products"));

			await expect(ProductsService.update(product, productId)).rejects.toThrow("Failed to get products");
		});

		it("should throw an error when updating a product fails", async () => {
			vi.spyOn(api, "get").mockResolvedValueOnce(product);
			vi.spyOn(api, "put").mockRejectedValueOnce(new Error("API error"));

			await expect(ProductsService.update(product, productId)).rejects.toThrowError("Erro ao editar produto");
		});
	});
});
