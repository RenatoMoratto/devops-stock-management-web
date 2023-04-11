import { VStack, useToast } from "@chakra-ui/react";
import { ProductListHeader } from "@/components/ProductListHeader";
import { ProductTable } from "@/components/ProductTable";
import { useEffect, useState } from "react";
import { ProductsService } from "@/api/services/ProductsService";
import { ProductDto } from "@/api/models/ProductDto";

type ProductListProps = { openModal: () => void };

export function ProductList(props: ProductListProps) {
	const [productList, setProductList] = useState<ProductDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const toast = useToast();

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const products = await ProductsService.getAll();
			setProductList(products);
		} catch (e) {
			toast({ status: "error", title: String(e) });
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteProduct = async (productId: string) => {
		try {
			await ProductsService.delete(productId);

			toast({ status: "success", title: "Produto excluído com sucesso." });

			fetchProducts();
		} catch (e) {
			toast({ status: "error", title: String(e) });
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<VStack paddingY="1.5rem" paddingX="3rem" gap="1.5rem">
			<ProductListHeader openModal={props.openModal} />
			<ProductTable isLoading={isLoading} data={productList} onDelete={handleDeleteProduct} />
		</VStack>
	);
}
