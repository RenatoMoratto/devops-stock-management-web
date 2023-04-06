import { ProductDto } from "@/api/models/ProductDto";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	FormControl,
	FormLabel,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	InputGroup,
	InputLeftElement,
	Textarea,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormEvent } from "react";

type AddProductModalProps = { isOpen: boolean; onClose: () => void };

const productInitialValue: ProductDto = {
	name: "",
	description: "",
	category: "",
	amount: 0,
	unitPrice: 0,
	supplier: "",
};

export function AddProductModal(props: AddProductModalProps) {
	const [product, setProduct] = useState<ProductDto>(productInitialValue);
	const [isLoading, setIsLoading] = useState(false);

	const handleAddProduct = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		await setTimeout(() => {
			console.table(product);
			setIsLoading(false);
		}, 800);

		props.onClose();
	};

	const handleProductChange = (e: { target: { name: string; value: any } }) => {
		setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<Modal size="xl" isCentered closeOnOverlayClick={false} {...props}>
			<ModalOverlay />
			<ModalContent data-testid="add-product-form" as="form" onSubmit={handleAddProduct}>
				<ModalHeader>Novo Produto</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Grid
						templateAreas={`"name name category category"
                                        "description description supplier supplier"
                                        "description description unitPrice amount"`}
						gridTemplateColumns="repeat(4, 1fr)"
						gridTemplateRows="repeat(3, 1fr)"
						gap={4}
					>
						<GridItem area="name">
							<FormControl isRequired>
								<FormLabel>Nome</FormLabel>
								<Input
									onChange={handleProductChange}
									name="name"
									placeholder="Digite o nome do produto"
								/>
							</FormControl>
						</GridItem>

						<GridItem area="category">
							<FormControl isRequired>
								<FormLabel>Categoria</FormLabel>
								<Input
									onChange={handleProductChange}
									name="category"
									placeholder="Digite a categoria do produto"
								/>
							</FormControl>
						</GridItem>

						<GridItem area="description">
							<FormControl isRequired>
								<FormLabel>Descrição</FormLabel>
								<Textarea
									onChange={handleProductChange}
									name="description"
									placeholder="Fale sobre o seu produto..."
									resize="vertical"
									rows={5}
								/>
							</FormControl>
						</GridItem>

						<GridItem area="supplier">
							<FormControl isRequired>
								<FormLabel>Fornecedor</FormLabel>
								<Input
									onChange={handleProductChange}
									name="supplier"
									placeholder="Digite o nome do fornecedor"
								/>
							</FormControl>
						</GridItem>

						<GridItem area="unitPrice">
							<FormControl isRequired>
								<FormLabel>Valor unitário</FormLabel>
								<NumberInput precision={2} min={0.01}>
									<InputGroup>
										<InputLeftElement pointerEvents="none" children="R$" />
										<NumberInputField
											onChange={handleProductChange}
											name="unitPrice"
											placeholder="0.00"
											paddingLeft="9"
										/>
									</InputGroup>
								</NumberInput>
							</FormControl>
						</GridItem>

						<GridItem area="amount">
							<FormControl isRequired>
								<FormLabel>Quantidade</FormLabel>
								<NumberInput min={1}>
									<NumberInputField onChange={handleProductChange} name="amount" placeholder="0" />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
						</GridItem>
					</Grid>
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
