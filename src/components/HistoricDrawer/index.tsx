import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { HistoricTable } from "@/components/HistoricTable";

type HistoricDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export function HistoricDrawer(props: HistoricDrawerProps) {
	return (
		<Drawer size="md" {...props}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>Histórico</DrawerHeader>
				<DrawerCloseButton />
				<DrawerBody>
					<HistoricTable />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
