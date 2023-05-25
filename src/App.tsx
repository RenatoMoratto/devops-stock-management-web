import { Box, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { AddProductModal } from "@/components/AddProductModal";
import { useState, useEffect } from "react";
import { Product } from "./api/models/Product";
import { ProductsService } from "./api/services/ProductsService";
import { ProductHeader } from "./components/ProductListHeader";
import { ProductTable } from "./components/ProductTable";
import { HistoricDrawer } from "./components/HistoricDrawer";

function App() {
	const [productList, setProductList] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
	const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

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
			<HistoricDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
			<AddProductModal isOpen={isModalOpen} onClose={onModalClose} fetchProducts={fetchProducts} />
			<Header />
			<VStack paddingY="1.5rem" paddingX="3rem" gap="1.5rem">
				<ProductHeader openModal={onModalOpen} openDrawer={onDrawerOpen} />
				<ProductTable isLoading={isLoading} data={productList} fetchProducts={fetchProducts} />
			</VStack>
		</Box>
	);
}

export default App;
