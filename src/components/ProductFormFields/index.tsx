import { ProductDto } from "@/api/models/ProductDto";
import { ProductsService } from "@/api/services/ProductsService";
import {
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	InputGroup,
	InputLeftElement,
	Textarea,
	Grid,
	GridItem,
	useToast,
} from "@chakra-ui/react";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";

export type ProductFormRefType = {
	handleSubmit: () => Promise<{
		isValid: boolean;
		product?: ProductDto;
	}>;
};

type ProductFormFieldsProps = {
	initialValue?: ProductDto;
};

const productInitialValue: ProductDto = {
	productName: "",
	productDescription: "",
	productCategory: "",
	productAmount: 0,
	produtcUnitPrice: 0,
	productSupplier: "",
};

function _ProductFormFields(
	{ initialValue = productInitialValue }: ProductFormFieldsProps,
	ref: Ref<ProductFormRefType>
) {
	const [product, setProduct] = useState<ProductDto>(initialValue);
	const [errors, setErrors] = useState<string[]>([]);
	const toast = useToast();

	const handleSubmit = async () => {
		const errors = ProductsService.validate(product);

		if (errors.length > 0) {
			errors.forEach(error => toast({ status: "error", title: error.message }));

			setErrors(errors.map(error => error.name));

			return { isValid: false };
		}
		return { isValid: true, product };
	};

	useImperativeHandle(ref, () => ({ handleSubmit }));

	const handleProductChange = (e: { target: { name: string; value: any } }) => {
		setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<Grid
			as="fieldset"
			templateAreas={`"name name category category"
                            "description description supplier supplier"
                            "description description unitPrice amount"`}
			gridTemplateColumns="repeat(4, 1fr)"
			gridTemplateRows="repeat(3, 1fr)"
			gap={4}
		>
			<GridItem area="name">
				<FormControl isInvalid={errors.includes("productName")}>
					<FormLabel>Nome</FormLabel>
					<Input
						onChange={handleProductChange}
						value={product.productName}
						name="productName"
						placeholder="Digite o nome do produto"
					/>
				</FormControl>
			</GridItem>

			<GridItem area="category">
				<FormControl isInvalid={errors.includes("productCategory")}>
					<FormLabel>Categoria</FormLabel>
					<Input
						onChange={handleProductChange}
						value={product.productCategory}
						name="productCategory"
						placeholder="Digite a categoria do produto"
					/>
				</FormControl>
			</GridItem>

			<GridItem area="description">
				<FormControl isInvalid={errors.includes("productDescription")}>
					<FormLabel>Descrição</FormLabel>
					<Textarea
						onChange={handleProductChange}
						value={product.productDescription}
						name="productDescription"
						placeholder="Fale sobre o seu produto..."
						resize="vertical"
						rows={5}
					/>
				</FormControl>
			</GridItem>

			<GridItem area="supplier">
				<FormControl isInvalid={errors.includes("productSupplier")}>
					<FormLabel>Fornecedor</FormLabel>
					<Input
						onChange={handleProductChange}
						value={product.productSupplier}
						name="productSupplier"
						placeholder="Digite o nome do fornecedor"
					/>
				</FormControl>
			</GridItem>

			<GridItem area="unitPrice">
				<FormControl isInvalid={errors.includes("produtcUnitPrice")}>
					<FormLabel>Valor unitário</FormLabel>
					<NumberInput value={product.produtcUnitPrice} precision={2} min={0.01}>
						<InputGroup>
							<InputLeftElement pointerEvents="none" children="R$" />
							<NumberInputField
								onChange={handleProductChange}
								name="produtcUnitPrice"
								placeholder="0.00"
								paddingLeft="9"
							/>
						</InputGroup>
					</NumberInput>
				</FormControl>
			</GridItem>

			<GridItem area="amount">
				<FormControl isInvalid={errors.includes("productAmount")}>
					<FormLabel>Quantidade</FormLabel>
					<NumberInput min={1} value={product.productAmount}>
						<NumberInputField onChange={handleProductChange} name="productAmount" placeholder="0" />
					</NumberInput>
				</FormControl>
			</GridItem>
		</Grid>
	);
}

export const ProductFormFields = forwardRef(_ProductFormFields);
