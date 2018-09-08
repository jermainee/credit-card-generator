# A simple TypeScript credit card generator
Generate valid credit card numbers with fake details for testing purposes

# Usage #

Generate single credit card number
```
const creditCardNumber = creditCardGenerator.generateSingle("VISA");
```

Generate multiple credit card numbers
```
const creditCardNumbers = creditCardGenerator.generateMultiple("VISA", 3);
```

# Supported credit card providers #
* VISA
* Mastercard
* Amex
* Diners
* Discover
* EnRoute
* JCB
* Voyager
