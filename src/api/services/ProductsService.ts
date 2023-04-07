import { isAxiosError } from "axios";
import { api } from "@/api/core/api";
import { ProductDto } from "@/api/models/ProductDto";
import { Error } from "@/api/models/Error";

export class ProductsService {
	public static validate(product: ProductDto): Array<Error> {
		const errors: Error[] = [];

		if (!product.name) {
			errors.push({ name: "name", message: "O nome é obrigatório." });
		}
		if (!product.description) {
			errors.push({ name: "description", message: "A descrição é obrigatório." });
		}
		if (!product.category) {
			errors.push({ name: "category", message: "A categoria é obrigatório." });
		}
		if (!product.supplier) {
			errors.push({ name: "supplier", message: "O fornecedor é obrigatório." });
		}
		if (!product.amount) {
			errors.push({ name: "amount", message: "A quantidade é obrigatório." });
		} else if (product.amount <= 0) {
			errors.push({ name: "amount", message: "A quantidade deve conter um valor maior ou igual à 0(zero)." });
		}
		if (!product.unitPrice) {
			errors.push({ name: "unitPrice", message: "O valor unitário é obrigatório." });
		} else if (product.amount <= 0) {
			errors.push({ name: "unitPrice", message: "O valor unitário deve conter um valor maior que 0(zero)." });
		}

		return errors;
	}

	public static async getAll(): Promise<Array<ProductDto>> {
		try {
			const response = await api.get<Array<ProductDto>>("/products");

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw "Erro ao carregar produtos";
		}
	}

	public static async create(data: ProductDto): Promise<ProductDto> {
		try {
			const response = await api.post<ProductDto>("/products", data);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error.message;
			}
			throw "Erro ao salvar produto";
		}
	}

	public static async update(data: ProductDto, id: string): Promise<ProductDto> {
		try {
			const response = await api.put<ProductDto>(`/products/${id}`, data);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw "Erro ao editar produto";
		}
	}

	public static async delete(id: string): Promise<ProductDto> {
		try {
			const response = await api.delete<ProductDto>(`/products/${id}`);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw error;
			}
			throw "Erro ao excluir produto";
		}
	}
}
