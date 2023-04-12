import { HistoricDto } from "@/api/models/HistoricDto";
import { HistoricService } from "@/api/services/HistoricService";
import { useMask } from "@/hooks/useMask";
import { CreatedIcon, DeletedIcon, EditedIcon, SortAscendingIcon, SortDescendingIcon } from "@/icons";
import { Tr, Th, Td, useToast, Icon, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CustomTable } from "../CustomTable";

export function HistoricTable() {
	const [historic, setHistoric] = useState<HistoricDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const toast = useToast();
	const mask = useMask();

	const historicItemIcon = {
		CREATED: <CreatedIcon />,
		DELETED: <DeletedIcon />,
		EDITED: <EditedIcon />,
		UP: <SortAscendingIcon />,
		DOWN: <SortDescendingIcon />,
	};

	const fetchHistoric = async () => {
		try {
			setIsLoading(true);
			const historic = await HistoricService.getAll();
			setHistoric(historic);
		} catch (e) {
			toast({ status: "error", title: String(e) });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchHistoric();
	}, []);

	return (
		<CustomTable
			isLoading={isLoading}
			head={
				<Tr>
					<Th>Data</Th>
					<Th>Operação</Th>
				</Tr>
			}
			rows={historic.map(item => (
				<Tr key={item.id}>
					<Td>
						{mask.toDate(item.createdAt!)}
						<br />
						{mask.toDatetime(item.createdAt!)}
					</Td>
					<Td>
						<HStack>
							<Icon boxSize={6}>{historicItemIcon[item.status]}</Icon>
							<span>
								{item.productName}
								{item.status !== "DELETED" && <span> ({item.amount})</span>}
							</span>
						</HStack>
					</Td>
				</Tr>
			))}
		/>
	);
}
