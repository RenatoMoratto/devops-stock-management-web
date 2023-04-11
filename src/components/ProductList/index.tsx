import { VStack, useToast } from "@chakra-ui/react";
import { ProductListHeader } from "@/components/ProductListHeader";
import { ProductTable } from "@/components/ProductTable";
import { useEffect, useState } from "react";
import { ProductsService } from "@/api/services/ProductsService";
import { ProductDto } from "@/api/models/ProductDto";

type ProductListProps = { openModal: () => void };

export function ProductList(props: ProductListProps) {
	const [productList, setProductList] = useState<ProductDto[]>([]);
	const toast = useToast();

	useEffect(() => {
		ProductsService.getAll()
			.then(products => setProductList(products))
			.catch(error => toast({ status: "error", title: String(error) }));
	}, []);

	return (
		<VStack paddingY="1.5rem" paddingX="3rem" gap="1.5rem">
			<ProductListHeader openModal={props.openModal} />
			<ProductTable data={productList} />
		</VStack>
	);
}
