import { describe, expect, vi } from "vitest";
import { render, screen, fireEvent, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("<App />", () => {
	it("App mounts properly", () => {
		const wrapper = render(<App />);
		expect(wrapper).toBeTruthy();
	});
});
