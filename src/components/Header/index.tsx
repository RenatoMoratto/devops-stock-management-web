import { Flex, Heading, Image } from "@chakra-ui/react";

export function Header() {
	return (
		<Flex
			data-testid="header"
			paddingY="1.5rem"
			paddingX="3rem"
			gap="2"
			bgColor="brand.500"
			width="full"
			alignItems="center"
		>
			<Image src="src/assets/logo.svg" alt="SM" />
			<Heading size="lg" fontWeight="light" color="white">
				Stock Management
			</Heading>
		</Flex>
	);
}
