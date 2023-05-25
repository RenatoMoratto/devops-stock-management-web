import { ProductsService } from "@/api/services/ProductsService";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useToast,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { ProductFormFields, ProductFormRefType } from "@/components/ProductFormFields";
import { Product } from "@/api/models/Product";
import { ProductDto } from "@/api/models/ProductDto";

type EditProductModalProps = {
	isOpen: boolean;
	product: Product;
	onClose: () => void;
	fetchProducts: () => void;
};

export function EditProductModal(props: EditProductModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const formRef = useRef<ProductFormRefType>(null);

	const handleEditProduct = async (product: ProductDto) => {
		setIsLoading(true);

		try {
			await ProductsService.update(
				{
					...product,
					productAmount: Number(product.productAmount),
					produtcUnitPrice: Number(product.produtcUnitPrice),
				},
				props.product.productId
			);

			toast({ status: "success", title: "Produto criado com sucesso." });
			props.fetchProducts();
			props.onClose();
		} catch (e) {
			toast({ status: "error", title: String(e) });
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const response = await formRef.current?.handleSubmit();

		if (response?.isValid) {
			handleEditProduct(response.product!);
		}
	};

	return (
		<Modal size="xl" isCentered closeOnOverlayClick={false} {...props}>
			<ModalOverlay />
			<ModalContent data-testid="edit-product-form" as="form" onSubmit={handleSubmit}>
				<ModalHeader>Novo Produto</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<ProductFormFields ref={formRef} initialValue={props.product} />
				</ModalBody>

				<ModalFooter gap="2">
					<Button colorScheme="green" variant="outline" onClick={props.onClose}>
						Cancelar
					</Button>
					<Button colorScheme="green" type="submit" isLoading={isLoading}>
						Salvar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
