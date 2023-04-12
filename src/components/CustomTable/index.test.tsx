import { render, screen } from "@testing-library/react";
import { Tr, Td } from "@chakra-ui/react";
import { CustomTable } from "./index";

describe("CustomTable", () => {
	it("shows spinner when isLoading is true", () => {
		render(<CustomTable isLoading={true} head={<></>} rows={[]} />);

		const spinner = screen.getByText("Loading...");
		expect(spinner).toBeInTheDocument();
	});

	it("shows rows when isLoading is false", () => {
		render(
			<CustomTable
				isLoading={false}
				head={<></>}
				rows={[
					<Tr>
						<Td>Row</Td>
					</Tr>,
				]}
			/>
		);

		const rowElement = screen.getByText("Row");
		expect(rowElement).toBeInTheDocument();
	});

	it("renders table head correctly", () => {
		const head = (
			<Tr>
				<Td>Header 1</Td>
				<Td>Header 2</Td>
			</Tr>
		);

		render(<CustomTable isLoading={false} head={head} rows={[]} />);

		const header1 = screen.getByText("Header 1");
		const header2 = screen.getByText("Header 2");

		expect(header1).toBeInTheDocument();
		expect(header2).toBeInTheDocument();
	});

	it("renders table rows correctly", () => {
		const rows = [
			<Tr>
				<Td>Row 1, Column 1</Td>
				<Td>Row 1, Column 2</Td>
			</Tr>,
			<Tr>
				<Td>Row 2, Column 1</Td>
				<Td>Row 2, Column 2</Td>
			</Tr>,
		];

		render(<CustomTable isLoading={false} head={<></>} rows={rows} />);

		const row1Column1 = screen.getByText("Row 1, Column 1");
		const row1Column2 = screen.getByText("Row 1, Column 2");
		const row2Column1 = screen.getByText("Row 2, Column 1");
		const row2Column2 = screen.getByText("Row 2, Column 2");

		expect(row1Column1).toBeInTheDocument();
		expect(row1Column2).toBeInTheDocument();
		expect(row2Column1).toBeInTheDocument();
		expect(row2Column2).toBeInTheDocument();
	});
});
