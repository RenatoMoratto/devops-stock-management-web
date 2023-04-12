import { RenderResult, renderHook } from "@testing-library/react-hooks";
import { useMask } from "./useMask";

describe("useMask", () => {
	const { result } = renderHook(() => useMask());

	describe("toBRL", () => {
		it("should return a string", () => {
			const formattedNumber = result.current.toBRL(10);
			expect(typeof formattedNumber).toBe("string");
		});

		it("should format number to Brazilian currency", () => {
			const formattedNumber = result.current.toBRL(10.5);
			expect(formattedNumber).toMatch(/(R\$)\W10,50/);
		});

		it("should format negative number to Brazilian currency", () => {
			const formattedNumber = result.current.toBRL(-10.5);
			expect(formattedNumber).toMatch(/-(R\$)\W10,50/);
		});
	});

	describe("toDate", () => {
		it("formats a valid date string as a localized date", () => {
			const value = "2021-12-31";
			expect(result.current.toDate(value)).toEqual("31/12/2021");
		});

		it("returns an empty string for an invalid date string", () => {
			const value = "not-a-date";
			expect(result.current.toDate(value)).toEqual("");
		});
	});

	describe("toDatetime", () => {
		it("formats a valid datetime string as a localized time", () => {
			const value = "2022-01-01T13:30:00.000Z";
			expect(result.current.toDatetime(value)).toEqual("10:30");
		});

		it("returns an empty string for an invalid datetime string", () => {
			const value = "not-a-datetime";
			expect(result.current.toDatetime(value)).toEqual("");
		});
	});
});
