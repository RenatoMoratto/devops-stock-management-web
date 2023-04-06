import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
	beforeEach(() => {
		render(<Header />);
	});

	it("renders the correct title", () => {
		const title = screen.getByText("Stock Management");
		expect(title).toBeInTheDocument();
	});

	it("renders the logo", () => {
		const logo = screen.getByAltText("SM");
		expect(logo).toBeInTheDocument();
	});
});
