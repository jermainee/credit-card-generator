export default class CreditCardGenerator {
    private creditCardPresets = {
        "VISA": {
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
        "MasterCard": {
            digitCount: 16,
            prefixes: [
                "51",
                "52",
                "53",
                "54",
                "55"
            ]
        },
        "Amex": {
            digitCount: 15,
            prefixes: [
                "34",
                "37"
            ]
        },
        "Diners": {
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
        "Discover": {
            digitCount: 16,
            prefixes: ["6011"]
        },
        "EnRoute": {
            digitCount: 16,
            prefixes: [
                "2014",
                "2149"
            ]
        },
        "JCB": {
            digitCount: 16,
            prefixes: [
                "35"
            ]
        },
        "Voyager": {
            digitCount: 16,
            prefixes: ["8699"]
        }
    };

    public generateSingle(vendor: string): string {
        if (!this.creditCardPresets[vendor]) {
            throw new Error("[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'");
        }

        return this.generateCreditCardNumber(this.creditCardPresets[vendor]);
    }

    public generateMultiple(vendor: string, count: number): string[] {
        if (!this.creditCardPresets[vendor]) {
            throw new Error("[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'");
        }

        const preset = this.creditCardPresets[vendor];
        const numbers = [];

        while (numbers.length < count) {
            numbers.push(this.generateCreditCardNumber(preset));
        }

        return numbers;
    }

    public generateCreditCardNumber(preset: any): string {
        const prefix = preset.prefixes[Math.floor(Math.random() * preset.prefixes.length)];
        const numberWithPrefix = prefix + this.generateRandomNumber(preset.digitCount);
        const checksum = this.calculateChecksum(numberWithPrefix);

        return numberWithPrefix + checksum;
    }

    private generateRandomNumber(length: number): string {
        let cardNumber = "";

        while (cardNumber.length < (length - 1)) {
            cardNumber += Math.floor(Math.random() * 10);
        }

        return cardNumber;
    }

    private calculateChecksum(cardNumber: string): number {
        const reversedCardNumber = this.reverseString(cardNumber);
        const reversedCardNumberArray = reversedCardNumber.split("");
        let sum = 0;

        for (let i = 1; i < reversedCardNumberArray.length; i++) {
            sum += parseInt(reversedCardNumberArray[i]) + parseInt(reversedCardNumberArray[i - 1]);
        }

        return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
    }

    private reverseString(string: string): string {
        const stringParts = string.split("");
        const reverseArray = stringParts.reverse();

        return reverseArray.join("");
    }
}
