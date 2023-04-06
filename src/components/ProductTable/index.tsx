import { TableContainer, Table, Thead, Tr, Th, Tbody, Button, ButtonGroup, Td } from "@chakra-ui/react";
import { useMask } from "@/hooks/useMask";

export type ProductTableItem = {
	id: string;
	name: string;
	description: string;
	category: string;
	amount: number;
	unitPrice: number;
	supplier: string;
};

type ProductTableProps = {
	data: ProductTableItem[];
};

export function ProductTable({ data }: ProductTableProps) {
	const mask = useMask();

	return (
		<TableContainer minWidth="full">
			<Table variant="striped" colorScheme="blackAlpha">
				<Thead>
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
					{data.map(item => (
						<Tr key={item.id}>
							<Td>{item.name}</Td>
							<Td>{item.description}</Td>
							<Td>{item.category}</Td>
							<Td isNumeric>{item.amount}</Td>
							<Td isNumeric>{mask.toBRL(item.unitPrice)}</Td>
							<Td>{item.supplier}</Td>
							<Td>
								<ButtonGroup spacing="2">
									<Button size="sm" colorScheme="green" variant="outline">
										Editar
									</Button>
									<Button size="sm" colorScheme="red" variant="outline">
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
