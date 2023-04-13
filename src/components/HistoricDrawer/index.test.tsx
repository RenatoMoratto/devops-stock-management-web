import { fireEvent, render, screen } from "@testing-library/react";
import { HistoricDrawer } from "./index";
import { vi } from "vitest";

describe("HistoricDrawer", () => {
	it("renders the correct title", () => {
		render(<HistoricDrawer isOpen={true} onClose={() => {}} />);

		const title = screen.getByText("Histórico");

		expect(title).toBeInTheDocument();
	});

	it("should render the historic table when drawer is open", () => {
		render(<HistoricDrawer isOpen={true} onClose={() => {}} />);

		const table = screen.getByRole("table");
		expect(table).toBeInTheDocument();
	});

	it("should close the drawer when close button is clicked", () => {
		const onClose = vi.fn();
		render(<HistoricDrawer isOpen={true} onClose={onClose} />);

		const closeButton = screen.getByRole("button", { name: "Close" });
		fireEvent.click(closeButton);

		expect(onClose).toHaveBeenCalled();
	});
});
