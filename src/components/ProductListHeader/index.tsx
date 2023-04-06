import { RepeatClockIcon, AddIcon } from "@chakra-ui/icons";
import { HStack, Heading, Button, Text, IconButton } from "@chakra-ui/react";

type ProductListHeaderProps = { openModal: () => void };

export function ProductListHeader(props: ProductListHeaderProps) {
	return (
		<HStack minWidth="full" alignItems="center" justifyContent="space-between">
			<Heading as="h3" size="xl" fontWeight="semibold" letterSpacing="wide">
				Produtos
			</Heading>
			<HStack>
				<IconButton
					icon={<RepeatClockIcon />}
					colorScheme="green"
					variant="outline"
					aria-label="Mostrar histórico"
				/>
				<Button leftIcon={<AddIcon />} colorScheme="green" onClick={props.openModal}>
					<Text>Adicionar produto</Text>
				</Button>
			</HStack>
		</HStack>
	);
}
