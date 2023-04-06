import { VStack } from "@chakra-ui/react";
import { ProductListHeader } from "@/components/ProductListHeader";
import { ProductTable, ProductTableItem } from "@/components/ProductTable";
import { useState } from "react";

const MOCK_PRODUCTS: ProductTableItem[] = [
	{
		id: "001",
		name: "T-shirt",
		description: "Cotton T-shirt for everyday use",
		category: "Clothing",
		amount: 100,
		unitPrice: 15.99,
		supplier: "ABC Clothing Co.",
	},
	{
		id: "002",
		name: "Backpack",
		description: "Lightweight backpack for outdoor activities",
		category: "Outdoor gear",
		amount: 50,
		unitPrice: 39.99,
		supplier: "DEF Gear Co.",
	},
	{
		id: "003",
		name: "Coffee Mug",
		description: "Ceramic coffee mug with a funny quote",
		category: "Kitchenware",
		amount: 200,
		unitPrice: 8.99,
		supplier: "GHI Housewares Co.",
	},
	{
		id: "004",
		name: "Bluetooth Speaker",
		description: "Portable wireless speaker with excellent sound quality",
		category: "Electronics",
		amount: 20,
		unitPrice: 79.99,
		supplier: "JKL Electronics Co.",
	},
	{
		id: "005",
		name: "Running Shoes",
		description: "Comfortable and durable running shoes for men",
		category: "Footwear",
		amount: 80,
		unitPrice: 129.99,
		supplier: "MNO Sports Co.",
	},
];

type ProductListProps = { openModal: () => void };

export function ProductList(props: ProductListProps) {
	const [productList, setProductList] = useState<ProductTableItem[]>(MOCK_PRODUCTS);

	return (
		<VStack paddingY="1.5rem" paddingX="3rem" gap="1.5rem">
			<ProductListHeader openModal={props.openModal} />
			<ProductTable data={productList} />
		</VStack>
	);
}
