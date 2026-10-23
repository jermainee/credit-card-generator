const DIGITS_ONLY = /^\d+$/;

/** Checks whether the value is a non-empty string of digits. */
export function isNumeric(value: string): boolean {
    return DIGITS_ONLY.test(value);
}

/**
 * Calculates the Luhn (mod 10) check digit that has to be appended to the given payload.
 *
 * @throws {TypeError} If the payload is empty or contains anything but digits.
 */
export function calculateLuhnCheckDigit(payload: string): number {
    if (!isNumeric(payload)) {
        throw new TypeError(`[CreditCardGenerator] Expected a numeric payload, received '${payload}'`);
    }

    let sum = 0;

    // The appended check digit becomes the rightmost digit, so doubling starts at the last payload digit.
    for (let index = payload.length - 1, double = true; index >= 0; index--, double = !double) {
        let digit = Number(payload[index]);

        if (double) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    return (10 - (sum % 10)) % 10;
}

/**
 * Checks whether the given card number consists of digits only and ends with a valid Luhn check digit.
 */
export function isLuhnValid(cardNumber: string): boolean {
    if (cardNumber.length < 2 || !isNumeric(cardNumber)) {
        return false;
    }

    return calculateLuhnCheckDigit(cardNumber.slice(0, -1)) === Number(cardNumber.slice(-1));
}
