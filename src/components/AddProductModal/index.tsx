import { ProductDto } from "@/api/models/ProductDto";
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
import { useRef, useState, FormEvent } from "react";
import { ProductFormFields, ProductFormRefType } from "../ProductFormFields";

type AddProductModalProps = {
	isOpen: boolean;
	onClose: () => void;
	fetchProducts: () => void;
};

export function AddProductModal(props: AddProductModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const formRef = useRef<ProductFormRefType>(null);
	const toast = useToast();

	const handleAddProduct = async (product: ProductDto) => {
		setIsLoading(true);

		try {
			await ProductsService.create({
				...product,
				productAmount: Number(product.productAmount),
				produtcUnitPrice: Number(product.produtcUnitPrice),
			});

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
			handleAddProduct(response.product!);
		}
	};

	return (
		<Modal size="xl" isCentered closeOnOverlayClick={false} {...props}>
			<ModalOverlay />
			<ModalContent data-testid="add-product-form" as="form" onSubmit={handleSubmit}>
				<ModalHeader>Novo Produto</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<ProductFormFields ref={formRef} />
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
