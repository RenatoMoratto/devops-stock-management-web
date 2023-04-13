import { TableContainer, Table, Thead, Tr, Tbody, Td, Spinner, Center } from "@chakra-ui/react";

type CustomTableProps = {
	isLoading: boolean;
	head: JSX.Element;
	rows: JSX.Element[];
};

export function CustomTable({ isLoading = false, head, rows }: CustomTableProps) {
	return (
		<TableContainer minWidth="full" overflowY="auto" maxHeight="4xl">
			<Table variant="striped" colorScheme="blackAlpha">
				<Thead position="sticky" top={0} bgColor="gray.100">
					{head}
				</Thead>
				<Tbody>
					{isLoading && (
						<Tr>
							<Td colSpan={7}>
								<Center>
									<Spinner date-testid="loading-spinner" size="xl" />
								</Center>
							</Td>
						</Tr>
					)}
					{!isLoading && rows}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
