import { calculateLuhnCheckDigit, isNumeric } from "./luhn";
import { creditCardPresets, type CreditCardVendor, type ICreditCardPreset } from "./vendors";

export default class CreditCardGenerator {
    /**
     * Generates a Luhn-valid card number for the given vendor.
     *
     * @throws {Error} If the vendor is unknown.
     */
    public static generateSingle(vendor: CreditCardVendor): string {
        return CreditCardGenerator.generateWithPreset(getPreset(vendor));
    }

    /**
     * Generates `count` Luhn-valid card numbers for the given vendor.
     *
     * @throws {RangeError} If the count is not a non-negative integer.
     * @throws {Error} If the vendor is unknown.
     */
    public static generateMultiple(vendor: CreditCardVendor, count: number): string[] {
        if (!Number.isSafeInteger(count) || count < 0) {
            throw new RangeError(`[CreditCardGenerator] Expected a non-negative integer count, received '${count}'`);
        }

        const preset = getPreset(vendor);

        return Array.from({ length: count }, () => CreditCardGenerator.generateWithPreset(preset));
    }

    /**
     * Generates a Luhn-valid card number from a random prefix of the preset, random digits and the check digit.
     *
     * @throws {TypeError} If the preset has no prefixes or a prefix is not numeric.
     * @throws {RangeError} If the digit count leaves no room for a prefix and the check digit.
     */
    public static generateWithPreset(preset: ICreditCardPreset): string {
        assertValidPreset(preset);

        const prefix = pickRandom(preset.prefixes);
        const payload = prefix + generateRandomDigits(preset.digitCount - prefix.length - 1);

        return payload + calculateLuhnCheckDigit(payload);
    }
}

function getPreset(vendor: CreditCardVendor): ICreditCardPreset {
    if (!Object.prototype.hasOwnProperty.call(creditCardPresets, vendor)) {
        throw new Error(`[CreditCardGenerator] Unknown credit card vendor '${vendor}'`);
    }

    return creditCardPresets[vendor];
}

function assertValidPreset({ digitCount, prefixes }: ICreditCardPreset): void {
    if (!Number.isSafeInteger(digitCount) || digitCount < 2) {
        throw new RangeError(`[CreditCardGenerator] Expected a digit count of at least 2, received '${digitCount}'`);
    }

    if (prefixes.length === 0) {
        throw new TypeError("[CreditCardGenerator] Expected at least one prefix");
    }

    for (const prefix of prefixes) {
        if (!isNumeric(prefix)) {
            throw new TypeError(`[CreditCardGenerator] Expected a numeric prefix, received '${prefix}'`);
        }

        if (prefix.length >= digitCount) {
            throw new RangeError(
                `[CreditCardGenerator] Prefix '${prefix}' leaves no room for the check digit of a ${digitCount} digit number`,
            );
        }
    }
}

function pickRandom<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)] as T;
}

function generateRandomDigits(length: number): string {
    let digits = "";

    while (digits.length < length) {
        digits += Math.floor(Math.random() * 10);
    }

    return digits;
}
