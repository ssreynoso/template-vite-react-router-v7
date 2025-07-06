# Testing Structure

This directory contains all test files organized by feature/module.

## Structure

```
test/
├── config/           # Test configuration and utilities
│   ├── setup.ts     # Global test setup
│   └── test-utils.tsx # Custom render utilities
├── components/      # Component tests
│   └── ui/         # UI component tests
└── lib/            # Library/utility tests
```

## Running Tests

- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI interface
- `pnpm test:coverage` - Run tests with coverage

## Writing Tests

1. Mirror the `src/` structure in `test/`
2. Use `@/` alias for imports from src
3. Import test utilities from `../config/test-utils` if needed
4. Follow naming convention: `*.test.{ts,tsx}`