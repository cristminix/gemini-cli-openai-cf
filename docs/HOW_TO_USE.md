# How to Use Documentation for Gemini CLI OpenAI Worker

This project includes multiple documentation approaches to help you understand and work with the codebase.

## Documentation Types

### 1. Manual JSDoc Documentation
Located in separate `.doc.ts` files in the `docs/` directory:
- `docs/models.ts.doc.ts` - Documentation for model-related functions and constants
- `docs/config.ts.doc.ts` - Documentation for configuration constants
- `docs/constants.ts.doc.ts` - Documentation for all project constants
- `docs/generation-config-validator.doc.ts` - Documentation for generation config validator
- `docs/auto-model-switching.doc.ts` - Documentation for auto model switching
- `docs/image-utils.doc.ts` - Documentation for image utility functions

### 2. Generated API Documentation (Recommended)
Located in `docs/typedoc/` directory:
- Complete API documentation generated with Typedoc
- Includes all classes, interfaces, functions, and types
- Searchable and well-organized
- Automatically generated from TypeScript source code

## How to Access Documentation

### For Generated Documentation:
1. Open `docs/typedoc/index.html` in your web browser
2. Use the search bar to find specific functions or classes
3. Navigate through the hierarchical structure to explore related components

### For Manual Documentation:
1. Browse the `.doc.ts` files in the `docs/` directory
2. These contain detailed JSDoc comments with purpose, parameters, and return types

## Updating Documentation

To regenerate the API documentation after code changes:

```bash
# Using npm
npm run docs

# Using pnpm
pnpm run docs

# Or directly with Typedoc
npx typedoc --out docs/typedoc --name "Gemini CLI OpenAI Worker" --includeVersion --readme README.md src/
```

## Documentation Standards

All documentation follows these principles:
- **Purpose**: Explains why each function/constant exists
- **Parameters**: Documents all parameter types and expected values
- **Return Types**: Documents return types and possible values
- **Error Conditions**: Explains when errors might occur
- **Usage Context**: Provides context for how components fit into the overall system