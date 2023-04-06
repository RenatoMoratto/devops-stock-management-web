import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductListHeader } from "./index";

describe("ProductListHeader", () => {
	beforeEach(() => {
		render(<ProductListHeader />);
	});

	it("renders the correct title", () => {
		const title = screen.getByText("Produtos");
		expect(title).toBeInTheDocument();
	});

	it("render buttons", () => {
		const buttons = screen.getAllByRole("button");

		expect(buttons.length).toBe(2);
	});
});
