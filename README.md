# Nontrivial PIN Generator

A minimalist Vue 3 application that generates a random, hard to guess PIN of a chosen length (from 4 to 10 digits) and displays it as large as possible using SVG auto-scaling.

## Overview

- **Responsive SVG Display:** Automatically scales numbers to fit the screen without scrollbars or heavy pixel-measuring JavaScript logic.
- **Dynamic Controls:** Range slider allowing seamless toggling between 4 and 10 digits.
- **Minimalist UI:** Clean black & white design with no external CSS framework dependencies.

## PIN Validation Logic

A generated PIN is considered **non-trivial** only if it meets all of the following criteria:

- **No Zero Start/End:** Must not start with `0`, and must not end with `0` or `5`.
- **Unique Digits:** All digits within the PIN must be unique.
- **No Monotonicity:** Cannot be strictly ascending or descending (e.g., `1234`, `1268`, `4321` or `9861`).
- **Not a Date:** Must not match any valid date format for 4, 6, or 8-digit lengths.

> The system generates a random PIN and validates it against these rules.

## Local Setup

### Prerequisites
- Node.js (v24+ recommended)
- npm

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ifmcjthenknczny/nontrivial-pin-generator.git](https://github.com/ifmcjthenknczny/nontrivial-pin-generator.git)
   cd nontrivial-pin-generator

```

2. **Install dependencies:**
```bash
npm install

```


3. **Run development server:**
```bash
npm run dev

```


4. **Build for production:**
```bash
npm run build

```

## License

Distributed under the [MIT](https://www.google.com/search?q=LICENSE) License.

## Contact

For questions or feedback, please reach out via GitHub.
[ifmcjthenknczny](https://github.com/ifmcjthenknczny)  

Project Link: [https://github.com/ifmcjthenknczny/nontrivial-pin-generator.git](https://github.com/ifmcjthenknczny/nontrivial-pin-generator.git)