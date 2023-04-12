import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Button,
	ButtonGroup,
	Td,
	Spinner,
	Center,
	useToast,
} from "@chakra-ui/react";
import { useMask } from "@/hooks/useMask";
import { ProductDto } from "@/api/models/ProductDto";
import { ProductsService } from "@/api/services/ProductsService";

type ProductTableProps = {
	data: ProductDto[];
	isLoading: boolean;
	fetchProducts: () => void;
};

export function ProductTable({ isLoading, data, fetchProducts }: ProductTableProps) {
	const mask = useMask();
	const toast = useToast();

	const handleDeleteProduct = async (productId: string) => {
		try {
			await ProductsService.delete(productId);

			toast({ status: "success", title: "Produto excluído com sucesso." });

			fetchProducts();
		} catch (e) {
			toast({ status: "error", title: String(e) });
		}
	};

	return (
		<TableContainer minWidth="full" overflowY="auto" maxHeight="2xl">
			<Table variant="striped" colorScheme="blackAlpha">
				<Thead position="sticky" top={0} bgColor="gray.100">
					<Tr>
						<Th>Nome</Th>
						<Th>Descrição</Th>
						<Th>Categoria</Th>
						<Th isNumeric>Quantidade</Th>
						<Th isNumeric>Valor unitário</Th>
						<Th>Fornecedor</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{isLoading && (
						<Tr>
							<Td colSpan={7}>
								<Center>
									<Spinner size="xl" />
								</Center>
							</Td>
						</Tr>
					)}
					{!isLoading &&
						data.map(item => (
							<Tr key={item.id}>
								<Td>{item.name}</Td>
								<Td maxWidth="sm" overflowX="clip" textOverflow="ellipsis">
									{item.description}
								</Td>
								<Td>{item.category}</Td>
								<Td isNumeric>{item.amount}</Td>
								<Td isNumeric>{mask.toBRL(item.unitPrice)}</Td>
								<Td>{item.supplier}</Td>
								<Td>
									<ButtonGroup spacing="2">
										<Button size="sm" colorScheme="green" variant="outline">
											Editar
										</Button>
										<Button
											size="sm"
											colorScheme="red"
											variant="outline"
											onClick={() => handleDeleteProduct(item.id!)}
										>
											Excluir
										</Button>
									</ButtonGroup>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
