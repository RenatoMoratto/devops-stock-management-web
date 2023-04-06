import { RenderResult, renderHook } from "@testing-library/react-hooks";
import { useMask } from "./useMask";

describe("useMask", () => {
	let maskHook: RenderResult<{ toBRL: (value: number) => string }>;

	beforeEach(() => {
		const { result } = renderHook(() => useMask());
		maskHook = result;
	});

	it("should return a string", () => {
		const formattedNumber = maskHook.current.toBRL(10);
		expect(typeof formattedNumber).toBe("string");
	});

	it("should format number to Brazilian currency", () => {
		const formattedNumber = maskHook.current.toBRL(10.5);
		expect(formattedNumber).toMatch(/(R\$)\W10,50/);
	});

	it("should format negative number to Brazilian currency", () => {
		const formattedNumber = maskHook.current.toBRL(-10.5);
		expect(formattedNumber).toMatch(/-(R\$)\W10,50/);
	});
});
