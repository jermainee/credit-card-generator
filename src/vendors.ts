export enum CreditCardVendor {
    VISA,
    MasterCard,
    Amex,
    Diners,
    Discover,
    EnRoute,
    JCB,
    Voyager,
}

export interface ICreditCardPreset {
    /** Total length of the card number, including prefix and check digit. */
    readonly digitCount: number;
    /** Issuer identification numbers of which one is picked at random. */
    readonly prefixes: readonly string[];
}

export const creditCardPresets: Readonly<Record<CreditCardVendor, ICreditCardPreset>> = {
    [CreditCardVendor.VISA]: {
        digitCount: 16,
        prefixes: ["4539", "4556", "4916", "4532", "4929", "4485", "4716", "4"],
    },
    [CreditCardVendor.MasterCard]: {
        digitCount: 16,
        prefixes: ["51", "52", "53", "54", "55"],
    },
    [CreditCardVendor.Amex]: {
        digitCount: 15,
        prefixes: ["34", "37"],
    },
    [CreditCardVendor.Diners]: {
        digitCount: 16,
        prefixes: ["300", "301", "302", "303", "36", "38"],
    },
    [CreditCardVendor.Discover]: {
        digitCount: 16,
        prefixes: ["6011"],
    },
    [CreditCardVendor.EnRoute]: {
        digitCount: 15,
        prefixes: ["2014", "2149"],
    },
    [CreditCardVendor.JCB]: {
        digitCount: 16,
        // Covers the JCB range 3528–3589.
        prefixes: ["3528", "3529", "353", "354", "355", "356", "357", "358"],
    },
    [CreditCardVendor.Voyager]: {
        digitCount: 15,
        prefixes: ["8699"],
    },
};
