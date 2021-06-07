"use strict";
exports.__esModule = true;
var CreditCardGenerator = /** @class */ (function () {
    function CreditCardGenerator() {
        this.creditCardPresets = {
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
    }
    CreditCardGenerator.prototype.generateSingle = function (vendor) {
        if (!this.creditCardPresets[vendor]) {
            throw new Error("[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'");
        }
        return this.generateCreditCardNumber(this.creditCardPresets[vendor]);
    };
    CreditCardGenerator.prototype.generateMultiple = function (vendor, count) {
        if (!this.creditCardPresets[vendor]) {
            throw new Error("[CreditCardGenerator] Unknown credit card vendor '" + vendor + "'");
        }
        var preset = this.creditCardPresets[vendor];
        var numbers = [];
        while (numbers.length < count) {
            numbers.push(this.generateCreditCardNumber(preset));
        }
        return numbers;
    };
    CreditCardGenerator.prototype.generateCreditCardNumber = function (preset) {
        var prefix = preset.prefixes[Math.floor(Math.random() * preset.prefixes.length)];
        var numberWithPrefix = prefix + this.generateRandomNumber(preset.digitCount);
        var checksum = this.calculateChecksum(numberWithPrefix);
        return numberWithPrefix + checksum;
    };
    CreditCardGenerator.prototype.generateRandomNumber = function (length) {
        var cardNumber = "";
        while (cardNumber.length < (length - 1)) {
            cardNumber += Math.floor(Math.random() * 10);
        }
        return cardNumber;
    };
    CreditCardGenerator.prototype.calculateChecksum = function (cardNumber) {
        var reversedCardNumber = this.reverseString(cardNumber);
        var reversedCardNumberArray = reversedCardNumber.split("");
        var sum = 0;
        for (var i = 1; i < reversedCardNumberArray.length; i++) {
            sum += parseInt(reversedCardNumberArray[i]) + parseInt(reversedCardNumberArray[i - 1]);
        }
        return ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
    };
    CreditCardGenerator.prototype.reverseString = function (string) {
        var stringParts = string.split("");
        var reverseArray = stringParts.reverse();
        return reverseArray.join("");
    };
    return CreditCardGenerator;
}());
exports["default"] = CreditCardGenerator;
