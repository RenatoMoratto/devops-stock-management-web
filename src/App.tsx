import { Box } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";

function App() {
	return (
		<Box bgColor="gray.100" minHeight="100vh">
			<Header />
			<ProductList />
		</Box>
	);
}

export default App;
