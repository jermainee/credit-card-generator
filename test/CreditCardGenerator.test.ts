import { afterEach, describe, expect, it, vi } from "vitest";
import CreditCardGenerator, { CreditCardVendor, type ICreditCardPreset, isLuhnValid } from "../src/index";

const SAMPLE_SIZE = 500;

// Lengths and issuer identification number ranges the generated numbers must satisfy.
const vendorSpecs = [
    { vendor: CreditCardVendor.VISA, name: "VISA", length: 16, iin: /^4/ },
    { vendor: CreditCardVendor.MasterCard, name: "MasterCard", length: 16, iin: /^5[1-5]/ },
    { vendor: CreditCardVendor.Amex, name: "Amex", length: 15, iin: /^3[47]/ },
    { vendor: CreditCardVendor.Diners, name: "Diners", length: 16, iin: /^(30[0-3]|36|38)/ },
    { vendor: CreditCardVendor.Discover, name: "Discover", length: 16, iin: /^6011/ },
    { vendor: CreditCardVendor.EnRoute, name: "EnRoute", length: 15, iin: /^(2014|2149)/ },
    { vendor: CreditCardVendor.JCB, name: "JCB", length: 16, iin: /^35(2[89]|[3-8]\d)/ },
    { vendor: CreditCardVendor.Voyager, name: "Voyager", length: 15, iin: /^8699/ },
];

afterEach(() => {
    vi.restoreAllMocks();
});

describe("CreditCardVendor", () => {
    it("keeps the numeric values of earlier releases", () => {
        expect(vendorSpecs.map(({ vendor }) => vendor)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    it("is available at runtime", () => {
        expect(CreditCardVendor[CreditCardVendor.JCB]).toBe("JCB");
    });
});

describe.each(vendorSpecs)("$name numbers", ({ vendor, length, iin }) => {
    const numbers = CreditCardGenerator.generateMultiple(vendor, SAMPLE_SIZE);

    it(`have exactly ${length} digits`, () => {
        for (const cardNumber of numbers) {
            expect(cardNumber).toMatch(new RegExp(`^\\d{${length}}$`));
        }
    });

    it("start with an issuer identification number of the vendor", () => {
        for (const cardNumber of numbers) {
            expect(cardNumber).toMatch(iin);
        }
    });

    it("pass the Luhn check", () => {
        for (const cardNumber of numbers) {
            expect(isLuhnValid(cardNumber)).toBe(true);
        }
    });

    it("are random", () => {
        expect(new Set(numbers).size).toBeGreaterThan(SAMPLE_SIZE * 0.99);
    });
});

describe("CreditCardGenerator.generateSingle", () => {
    it("returns a single card number for the vendor", () => {
        const cardNumber = CreditCardGenerator.generateSingle(CreditCardVendor.Amex);

        expect(cardNumber).toMatch(/^3[47]\d{13}$/);
        expect(isLuhnValid(cardNumber)).toBe(true);
    });

    it("throws for an unknown vendor", () => {
        expect(() => CreditCardGenerator.generateSingle(42 as CreditCardVendor)).toThrow(
            "[CreditCardGenerator] Unknown credit card vendor '42'",
        );
    });

    it("works when called without its class as receiver", () => {
        const { generateSingle } = CreditCardGenerator;

        expect(generateSingle(CreditCardVendor.VISA)).toMatch(/^4\d{15}$/);
    });
});

describe("CreditCardGenerator.generateMultiple", () => {
    it("returns the requested amount of card numbers", () => {
        expect(CreditCardGenerator.generateMultiple(CreditCardVendor.MasterCard, 3)).toHaveLength(3);
    });

    it("returns an empty list for a count of zero", () => {
        expect(CreditCardGenerator.generateMultiple(CreditCardVendor.VISA, 0)).toEqual([]);
    });

    it.each([-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])("throws for the invalid count %s", (count) => {
        expect(() => CreditCardGenerator.generateMultiple(CreditCardVendor.VISA, count)).toThrow(RangeError);
    });

    it("throws for an unknown vendor", () => {
        expect(() => CreditCardGenerator.generateMultiple(-1 as CreditCardVendor, 1)).toThrow(
            "[CreditCardGenerator] Unknown credit card vendor '-1'",
        );
    });
});

describe("CreditCardGenerator.generateWithPreset", () => {
    it("builds the number from prefix, random digits and check digit", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.5);

        // Prefix "12", seven random fives and the check digit of "125555555".
        expect(CreditCardGenerator.generateWithPreset({ digitCount: 10, prefixes: ["12"] })).toBe("1255555557");
    });

    it("picks the prefix at random", () => {
        const preset: ICreditCardPreset = { digitCount: 12, prefixes: ["11", "22"] };
        vi.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValue(0.99);

        expect(CreditCardGenerator.generateWithPreset(preset)).toMatch(/^11/);
        expect(CreditCardGenerator.generateWithPreset(preset)).toMatch(/^22/);
    });

    it("supports prefixes that leave room for the check digit only", () => {
        expect(CreditCardGenerator.generateWithPreset({ digitCount: 4, prefixes: ["123"] })).toBe("1230");
    });

    it("accepts read-only presets", () => {
        const preset = { digitCount: 19, prefixes: ["4"] } as const satisfies ICreditCardPreset;

        expect(CreditCardGenerator.generateWithPreset(preset)).toMatch(/^4\d{18}$/);
    });

    it.each([
        ["a digit count below two", { digitCount: 1, prefixes: ["4"] }, RangeError],
        ["a fractional digit count", { digitCount: 15.5, prefixes: ["4"] }, RangeError],
        ["no prefixes", { digitCount: 16, prefixes: [] }, TypeError],
        ["an empty prefix", { digitCount: 16, prefixes: [""] }, TypeError],
        ["a non-numeric prefix", { digitCount: 16, prefixes: ["4x"] }, TypeError],
        ["a prefix without room for the check digit", { digitCount: 4, prefixes: ["1234"] }, RangeError],
    ])("throws for a preset with %s", (_, preset, error) => {
        expect(() => CreditCardGenerator.generateWithPreset(preset)).toThrow(error);
    });
});
