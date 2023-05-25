import { Tr, Th, Button, ButtonGroup, Td, useToast, useDisclosure } from "@chakra-ui/react";
import { useMask } from "@/hooks/useMask";
import { Product } from "@/api/models/Product";
import { ProductsService } from "@/api/services/ProductsService";
import { useState } from "react";
import { EditProductModal } from "../EditProductModal";
import { CustomTable } from "../CustomTable";

type ProductTableProps = {
	data: Product[];
	isLoading: boolean;
	fetchProducts: () => void;
};

export function ProductTable({ isLoading, data, fetchProducts }: ProductTableProps) {
	const [productIndex, setProductIndex] = useState<number>(0);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const mask = useMask();
	const toast = useToast();

	const handleDeleteProduct = async (productId: number) => {
		try {
			await ProductsService.delete(productId);

			toast({ status: "success", title: "Produto excluído com sucesso." });

			fetchProducts();
		} catch (e) {
			toast({ status: "error", title: String(e) });
		}
	};

	const handleEditProductClick = async (productIndex: number) => {
		setProductIndex(productIndex);
		onOpen();
	};

	return (
		<>
			<EditProductModal
				isOpen={isOpen}
				onClose={onClose}
				product={data[productIndex]}
				fetchProducts={fetchProducts}
			/>

			<CustomTable
				isLoading={isLoading}
				head={
					<Tr>
						<Th>Nome</Th>
						<Th>Descrição</Th>
						<Th>Categoria</Th>
						<Th isNumeric>Quantidade</Th>
						<Th isNumeric>Valor unitário</Th>
						<Th>Fornecedor</Th>
						<Th></Th>
					</Tr>
				}
				rows={data.map((item, index) => (
					<Tr key={item.productId}>
						<Td>{item.productName}</Td>
						<Td maxWidth="sm" overflowX="clip" textOverflow="ellipsis">
							{item.productDescription}
						</Td>
						<Td>{item.productCategory}</Td>
						<Td isNumeric>{item.productAmount}</Td>
						<Td isNumeric>{mask.toBRL(item.produtcUnitPrice)}</Td>
						<Td>{item.productSupplier}</Td>
						<Td>
							<ButtonGroup spacing="2">
								<Button
									size="sm"
									colorScheme="green"
									variant="outline"
									onClick={() => handleEditProductClick(index)}
								>
									Editar
								</Button>
								<Button
									size="sm"
									colorScheme="red"
									variant="outline"
									onClick={() => handleDeleteProduct(item.productId!)}
								>
									Excluir
								</Button>
							</ButtonGroup>
						</Td>
					</Tr>
				))}
			/>
		</>
	);
}
