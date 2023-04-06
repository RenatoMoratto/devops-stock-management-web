import { Box, useDisclosure } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { AddProductModal } from "@/components/AddProductModal";

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box bgColor="gray.100" minHeight="100vh">
			<AddProductModal isOpen={isOpen} onClose={onClose} />
			<Header />
			<ProductList openModal={onOpen}/>
		</Box>
	);
}

export default App;
