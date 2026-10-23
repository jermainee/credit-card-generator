# Changelog

All notable changes to this project are documented in this file. The project follows
[Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-10-23

### Fixed

- Generated numbers pass the Luhn check. The check digit was calculated with a wrong algorithm before, so only about
  one in ten numbers was valid.
- Generated numbers have the length of their vendor. The prefix was added on top of the digit count before, which made
  numbers 17 to 20 digits long.
- `CreditCardGenerator.generateMultiple()` no longer runs out of memory for an infinite count.
- JCB numbers start within the JCB range 3528–3589 instead of anywhere in 35.
- EnRoute and Voyager numbers have 15 digits.
- The methods of `CreditCardGenerator` work when called without the class as receiver, for example after destructuring.

### Added

- `isLuhnValid()` and `calculateLuhnCheckDigit()` to validate numbers and calculate check digits.
- ES module and CommonJS builds with TypeScript declarations, so the package works without compiling its sources.
- Unit tests, a CI workflow and Dependabot updates.

### Changed

- **Breaking:** `CreditCardVendor` is a regular enum instead of a `const enum`. Its values are unchanged.
- **Breaking:** The package exposes its entry point through `exports`. Deep imports such as
  `@jermainee/credit-card-generator/src/CreditCardGenerator` no longer resolve.
- **Breaking:** `generateMultiple()` throws a `RangeError` for counts that are not non-negative integers and
  `generateWithPreset()` throws for presets without prefixes, with non-numeric prefixes or without room for the check
  digit.
- `ICreditCardPreset` accepts read-only prefix arrays.
- The release workflow checks that the release tag matches the package version and can create the GitHub release
  itself.

## [1.0.4] and earlier

See the [GitHub releases](https://github.com/jermainee/credit-card-generator/releases).

[2.0.0]: https://github.com/jermainee/credit-card-generator/compare/1.0.4...2.0.0
[1.0.4]: https://github.com/jermainee/credit-card-generator/releases/tag/1.0.4
