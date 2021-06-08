# A simple TypeScript credit card generator
With this simple TypeScript tool you can generate valid credit card numbers with fake details for testing purposes

[![Node.js Package](https://github.com/jermainee/credit-card-generator/actions/workflows/release-package.yml/badge.svg)](https://github.com/jermainee/credit-card-generator/actions/workflows/release-package.yml)

## Installation
```
npm install jermainee/credit-card-generator
```

## Usage

Import the CreditCardGenerator and CreditCardVendor enum
```typescript
import CreditCardGenerator, { CreditCardVendor } from 'credit-card-generator';
```

Generating a single credit card number:
```typescript
const creditCardNumber = creditCardGenerator.generateSingle(CreditCardVendor.VISA);
```

Generating multiple credit card numbers:
```typescript
const creditCardNumbers = creditCardGenerator.generateMultiple(CreditCardVendor.MasterCard, 3);
```

Generating a credit card number using your own preset (see ICreditCardPreset):
```typescript
const creditCardNumber = creditCardGenerator.generateWithPreset(preset);
```

## Supported credit card vendors
* VISA
* MasterCard
* Amex
* Diners
* Discover
* EnRoute
* JCB
* Voyager
