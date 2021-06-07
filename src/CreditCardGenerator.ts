export const enum CreditCardVendor {
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
    digitCount: number;
    prefixes: string[];
}

export default class CreditCardGenerator {
    private static creditCardPresets: ICreditCardPreset[] = [
        {
            digitCount: 16,
            prefixes: [
                "4539",
                "4556",
                "4916",
                "4532",
                "4929",
                "4485",
                "4716",
                "4"
            ]
        },
        {
            digitCount: 16,
            prefixes: [
                "51",
                "52",
                "53",
                "54",
                "55"
            ]
        },
        {
            digitCount: 15,
            prefixes: [
                "34",
                "37"
            ]
        },
        {
            digitCount: 16,
            prefixes: [
                "300",
                "301",
                "302",
                "303",
                "36",
                "38"
            ]
        },
        {
            digitCount: 16,
            prefixes: ["6011"]
        },
        {
            digitCount: 16,
            prefixes: [
                "2014",
                "2149"
            ]
        },
        {
            digitCount: 16,
            prefixes: [
                "35"
            ]
        },
        {
            digitCount: 16,
            prefixes: ["8699"]
        }
    ];

    public static generateSingle(vendor: CreditCardVendor): string {
        if (!this.creditCardPresets[vendor]) {
            throw new Error("[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'");
        }

        return this.generateWithPreset(this.creditCardPresets[vendor]);
    }

    public static generateMultiple(vendor: CreditCardVendor, count: number): string[] {
        if (!this.creditCardPresets[vendor]) {
            throw new Error("[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'");
        }

        const preset = this.creditCardPresets[vendor];
        const numbers = [];

        while (numbers.length < count) {
            numbers.push(this.generateWithPreset(preset));
        }

        return numbers;
    }

    public static generateWithPreset(preset: ICreditCardPreset): string {
        const prefix = preset.prefixes[Math.floor(Math.random() * preset.prefixes.length)];
        const numberWithPrefix = prefix + this.generateRandomNumber(preset.digitCount);
        const checksum = this.calculateChecksum(numberWithPrefix);

        return numberWithPrefix + checksum;
    }

    private static generateRandomNumber(length: number): string {
        let cardNumber = "";

        while (cardNumber.length < (length - 1)) {
            cardNumber += Math.floor(Math.random() * 10);
        }

        return cardNumber;
    }

    private static calculateChecksum(cardNumber: string): number {
        const reversedCardNumber = this.reverseString(cardNumber);
        const reversedCardNumberArray = reversedCardNumber.split("");
        let sum = 0;

        for (let i = 1; i < reversedCardNumberArray.length; i++) {
            sum += parseInt(reversedCardNumberArray[i]) + parseInt(reversedCardNumberArray[i - 1]);
        }

        return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
    }

    private static reverseString(string: string): string {
        const stringParts = string.split("");
        const reverseArray = stringParts.reverse();

        return reverseArray.join("");
    }
}
