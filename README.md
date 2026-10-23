<h1 align="center">Credit Card Generator</h1>
<p align="center">
  Generate Luhn-valid credit card numbers with vendor-specific prefixes for testing purposes
</p>

[![CI](https://github.com/jermainee/credit-card-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/jermainee/credit-card-generator/actions/workflows/ci.yml)
[![Node.js Package](https://github.com/jermainee/credit-card-generator/actions/workflows/release-package.yml/badge.svg)](https://github.com/jermainee/credit-card-generator/actions/workflows/release-package.yml)

The generated numbers have the right length, start with a real issuer identification number of the vendor and pass the
Luhn check, so they get through the format validation of payment forms. They do not belong to real accounts and cannot
be charged.

The package ships ES module and CommonJS builds with TypeScript declarations and has no runtime dependencies.

## Installation

The package is published to [GitHub Packages](https://github.com/jermainee/credit-card-generator/packages). Point the
`@jermainee` scope to its registry in your project's `.npmrc` and
[authenticate](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)
with a token that has the `read:packages` scope:

```
@jermainee:registry=https://npm.pkg.github.com
```

```
npm install --save-dev @jermainee/credit-card-generator
```

Installing straight from the repository works as well and builds the package on install:

```
npm install --save-dev github:jermainee/credit-card-generator
```

## Usage

Import the `CreditCardGenerator` and the `CreditCardVendor` enum:

```typescript
import CreditCardGenerator, { CreditCardVendor } from "@jermainee/credit-card-generator";
```

With CommonJS the generator is the `default` export:

```javascript
const { default: CreditCardGenerator, CreditCardVendor } = require("@jermainee/credit-card-generator");
```

Generating a single credit card number:

```typescript
const creditCardNumber = CreditCardGenerator.generateSingle(CreditCardVendor.VISA);
// "4716169796495547"
```

Generating multiple credit card numbers:

```typescript
const creditCardNumbers = CreditCardGenerator.generateMultiple(CreditCardVendor.MasterCard, 3);
```

Generating a credit card number using your own preset (see `ICreditCardPreset`):

```typescript
import CreditCardGenerator, { type ICreditCardPreset } from "@jermainee/credit-card-generator";

const preset: ICreditCardPreset = { digitCount: 19, prefixes: ["4"] };
const creditCardNumber = CreditCardGenerator.generateWithPreset(preset);
```

`digitCount` is the total length of the number including the prefix and the check digit. One of the `prefixes` is
picked at random for every number.

Checking numbers with the Luhn algorithm:

```typescript
import { calculateLuhnCheckDigit, isLuhnValid } from "@jermainee/credit-card-generator";

isLuhnValid("4111111111111111"); // true
calculateLuhnCheckDigit("411111111111111"); // 1
```

Invalid input throws instead of producing invalid numbers: unknown vendors throw an `Error`, counts that are not
non-negative integers throw a `RangeError` and malformed presets throw a `TypeError` or `RangeError`.

## Supported credit card vendors

| Vendor       | Digits | Prefixes                                     |
| ------------ | -----: | -------------------------------------------- |
| `VISA`       |     16 | 4                                            |
| `MasterCard` |     16 | 51–55                                        |
| `Amex`       |     15 | 34, 37                                       |
| `Diners`     |     16 | 300–303, 36, 38                              |
| `Discover`   |     16 | 6011                                         |
| `EnRoute`    |     15 | 2014, 2149                                   |
| `JCB`        |     16 | 3528–3589                                    |
| `Voyager`    |     15 | 8699                                         |

## Development

```
npm ci
npm test               # run the unit tests
npm run test:coverage  # run the unit tests with coverage
npm run check          # typecheck, test with coverage, build and lint the package
```

## Releasing

1. Bump the version with `npm version <major|minor|patch> --no-git-tag-version` and describe the changes in
   [CHANGELOG.md](CHANGELOG.md).
2. Merge the changes into `master`.
3. Run the [Node.js Package](https://github.com/jermainee/credit-card-generator/actions/workflows/release-package.yml)
   workflow on `master`. It checks and publishes the package and creates the GitHub release with the changelog entry.
   Publishing a GitHub release whose tag equals the package version publishes the package as well.
