import { describe, expect, it } from "vitest";
import { calculateLuhnCheckDigit, isLuhnValid } from "../src/index";

describe("calculateLuhnCheckDigit", () => {
    it.each([
        ["7992739871", 3],
        ["411111111111111", 1],
        ["555555555555444", 4],
        ["37828224631000", 5],
        ["0", 0],
        ["9", 1],
    ])("returns the check digit for %s", (payload, checkDigit) => {
        expect(calculateLuhnCheckDigit(payload)).toBe(checkDigit);
    });

    it.each(["", "4111 1111", "41a1", "-1"])("rejects the non-numeric payload %j", (payload) => {
        expect(() => calculateLuhnCheckDigit(payload)).toThrow(TypeError);
    });
});

describe("isLuhnValid", () => {
    it.each(["79927398713", "4111111111111111", "5555555555554444", "378282246310005", "6011111111111117"])(
        "accepts the valid number %s",
        (cardNumber) => {
            expect(isLuhnValid(cardNumber)).toBe(true);
        },
    );

    it.each(["79927398710", "4111111111111112", "378282246310006"])("rejects the invalid number %s", (cardNumber) => {
        expect(isLuhnValid(cardNumber)).toBe(false);
    });

    it.each(["", "0", "4111 1111 1111 1111", "4111-1111-1111-1111", "abc"])("rejects the malformed input %j", (input) => {
        expect(isLuhnValid(input)).toBe(false);
    });
});
