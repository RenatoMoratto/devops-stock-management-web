import { isAxiosError } from "axios";
import { api } from "@/api/core/api";
import { Product } from "@/api/models/Product";
import { ProductDto } from "@/api/models/ProductDto";
import { ValidationError } from "@/api/models/ValidationError";

export class ProductsService {
	public static validate(product: ProductDto): Array<ValidationError> {
		const errors: ValidationError[] = [];

		if (!product.productName) {
			errors.push({ name: "productName", message: "O nome é obrigatório." });
		}
		if (!product.productDescription) {
			errors.push({ name: "productDescription", message: "A descrição é obrigatório." });
		}
		if (!product.productCategory) {
			errors.push({ name: "productCategory", message: "A categoria é obrigatório." });
		}
		if (!product.productSupplier) {
			errors.push({ name: "productSupplier", message: "O fornecedor é obrigatório." });
		}
		if (!product.productAmount) {
			errors.push({ name: "productAmount", message: "A quantidade é obrigatório." });
		} else if (product.productAmount <= 0) {
			errors.push({
				name: "productAmount",
				message: "A quantidade deve conter um valor maior ou igual à 0(zero).",
			});
		}
		if (!product.produtcUnitPrice) {
			errors.push({ name: "produtcUnitPrice", message: "O valor unitário é obrigatório." });
		} else if (product.produtcUnitPrice <= 0) {
			errors.push({
				name: "produtcUnitPrice",
				message: "O valor unitário deve conter um valor maior que 0(zero).",
			});
		}

		return errors;
	}

	public static async getAll(): Promise<Array<Product>> {
		try {
			const response = await api.get<Array<Product>>("/product");

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw "Erro ao carregar produtos";
		}
	}

	public static async create(data: ProductDto): Promise<Product> {
		try {
			const response = await api.post<Product>("/product", data);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error.message;
			}
			throw "Erro ao salvar produto";
		}
	}

	public static async update(data: ProductDto, id: string): Promise<Product> {
		try {
			const response = await api.patch<Product>(`/product/${id}`, data);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw "Erro ao editar produto";
		}
	}

	public static async delete(id: string): Promise<Product> {
		try {
			const response = await api.delete<Product>(`/product/${id}`);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw "Erro ao excluir produto";
		}
	}
}
