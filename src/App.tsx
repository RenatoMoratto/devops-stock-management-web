import { Box, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { AddProductModal } from "@/components/AddProductModal";
import { useState, useEffect } from "react";
import { ProductDto } from "./api/models/ProductDto";
import { ProductsService } from "./api/services/ProductsService";
import { ProductHeader } from "./components/ProductListHeader";
import { ProductTable } from "./components/ProductTable";

function App() {
	const [productList, setProductList] = useState<ProductDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const { isOpen, onOpen, onClose } = useDisclosure();

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

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<Box bgColor="gray.100" minHeight="100vh">
			<AddProductModal isOpen={isOpen} onClose={onClose} fetchProducts={fetchProducts} />
			<Header />
			<VStack paddingY="1.5rem" paddingX="3rem" gap="1.5rem">
				<ProductHeader openModal={onOpen} />
				<ProductTable isLoading={isLoading} data={productList} fetchProducts={fetchProducts} />
			</VStack>
		</Box>
	);
}

export default App;
