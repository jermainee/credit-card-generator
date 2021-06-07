# A simple TypeScript credit card generator
Generate valid credit card numbers with fake details for testing purposes

## Installation
```
npm install jermainee/credit-card-generator
```

## Usage

Import the CreditCardGenerator and CreditCardVendor enum
```
import CreditCardGenerator, { CreditCardVendor } from 'credit-card-generator';
```

Generate a single credit card number
```
const creditCardNumber = creditCardGenerator.generateSingle(CreditCardVendor.VISA);
```

Generate multiple credit card numbers
```
const creditCardNumbers = creditCardGenerator.generateMultiple(CreditCardVendor.MasterCard, 3);
```

Generate a credit card number with your own preset (see ICreditCardPreset)
```
const creditCardNumber = creditCardGenerator.generateWithPreset(preset);
```

## Supported credit card providers
* VISA
* MasterCard
* Amex
* Diners
* Discover
* EnRoute
* JCB
* Voyager
