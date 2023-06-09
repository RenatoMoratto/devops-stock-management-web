import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProductHeader } from "./index";

describe("ProductListHeader", () => {
	let clickOpenButton = false;

	beforeEach(() => {
		render(
			<ProductHeader
				openModal={() => {
					clickOpenButton = !clickOpenButton;
				}}
				openDrawer={() => {}}
			/>
		);
	});

	it("renders the correct title", () => {
		const title = screen.getByText("Produtos");
		expect(title).toBeInTheDocument();
	});

	it("render buttons", () => {
		const buttons = screen.getAllByRole("button");

		expect(buttons).toHaveLength(2);
	});

	it("call openModal on button click", () => {
		const button = screen.getByText(/Adicionar produto/);

		const previousValue = clickOpenButton;

		fireEvent.click(button);

		expect(!clickOpenButton).toBe(previousValue);
	});
});
