# AI Contribute Guidelines

This file must be written in English for consistency.

## Project Overview

Bingsu (빙수) is an open-source personal double-entry bookkeeping application built with Nuxt 4, Vue 3, TypeScript, and
Reka UI. This is an early-stage project with foundational architecture in place.

## Development Commands

### Daily Development

```bash
pnpm app:dev          # Start development server
pnpm app:build        # Build for production
pnpm app:preview      # Preview production build
```

### Testing

```bash
pnpm test             # Run all tests (unit + nuxt)
pnpm test:unit        # Run unit tests only (node environment)
pnpm test:nuxt        # Run nuxt/component tests (nuxt environment)
pnpm test:coverage    # Run all tests with coverage report

# Run single test file
pnpm vitest test/unit/path/to/test.spec.ts    # Unit test
pnpm vitest test/e2e/path/to/test.spec.ts     # E2E/component test
```

### Code Quality

```bash
pnpm lint             # Run both type checking and ESLint
pnpm lint:types       # TypeScript type checking only
pnpm lint:code        # ESLint checking only
pnpm lintfix          # Auto-fix ESLint issues
```

### Build & CI

```bash
pnpm build            # Full production build (runs app:build)
```

## Architecture

### Directory Structure

- `app/` - Main Nuxt application code
    - `components/` - Auto-imported Vue components (Reka UI components in `ui/`)
    - `layouts/` - Layout wrappers (file-based, auto-applied by routing)
    - `pages/` - File-based routing pages
    - `app.vue` - Root component entry point
- `shared/` - Shared utilities and constants (auto-imported via `#shared/**` alias)
- `test/` - Test suite
    - `unit/` - Unit tests (node environment)
    - `e2e/` - Component/integration tests (nuxt environment)

### Key Architectural Patterns

#### Auto-Import System

- **Components**: All components in `app/components/` are auto-imported
- **Composables**: Nuxt composables (e.g., `useHead()`, `useId()`) are auto-imported
- **Shared Code**: Files in `shared/` are auto-imported with `#shared/**` alias

Example:

```typescript
// No need to import - auto-imported from shared/constants.ts
console.log(APP_ID, APP_NAME)
```

#### Component Architecture

- **Root Wrapper**: `app/components/bingsu-app.vue` manages app-wide configuration:
    - Reka UI config provider
    - Title template with separator
    - Locale (Korean: "ko")
    - Text direction (LTR)
- **Layouts**: Use slot-based pattern for wrapping page content
- **Reka UI Integration**: Components prefixed with "Reka" (e.g., `<RekaButton>`)

#### Testing Strategy

- **Unit Tests**: `test/unit/**/*.{test,spec}.ts` - For logic, utilities, non-component code (node environment)
- **Nuxt Tests**: `test/e2e/**/*.{test,spec}.ts` - For components, composables, integration tests (nuxt environment)

When writing tests:

- Use `test/unit/` for pure logic that doesn't need Nuxt runtime
- Use `test/e2e/` for components, pages, composables that require Nuxt context

### Configuration Files

#### nuxt.config.ts

- Telemetry disabled
- Root element ID: "bingsu" (from `APP_ID` constant)
- Modules: `@nuxt/test-utils/module`, `reka-ui/nuxt`
- Auto-imports from `#shared/**` directory
- Reka UI prefix: "Reka"

#### vitest.config.ts

- **Dual-project setup**:
    1. Unit tests (node environment)
    2. Nuxt tests (nuxt environment via `@nuxt/test-utils`)
- **Coverage**: Reports on failure, includes `app/`, `server/`, `shared/` directories

#### eslint.config.js

- Uses `@antfu/eslint-config` preset with Vue support
- Supports caching and auto-fixing

## Code Standards

### TypeScript

- Strict TypeScript configuration from Nuxt
- Type checking via `pnpm lint:types`
- Uses `.nuxt/` generated TypeScript configs

### Shared Code

- Place reusable constants in `shared/constants.ts`
- Place utilities in `shared/` directory
- All exports are auto-imported via `#shared/**` alias

## AI Contributions

When contributing with AI assistance (Claude Code, GitHub Copilot, etc.):

- **MUST disclose AI tool usage** in issues/PRs
- Be transparent about scope and method of AI assistance
- All contributions fall under AGPL-3.0 license

Examples:
> This PR was mostly written by Claude Code.

> I used GitHub Copilot for understanding the codebase, but wrote all code myself.

## External Documentation

For framework/library-specific guidance:

- Nuxt: https://nuxt.com/llms.txt
- Reka UI: https://reka-ui.com/llms.txt
- Drizzle ORM: https://orm.drizzle.team/llms.txt
