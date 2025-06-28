# vite-config-paths

Give Vite the ability to resolve imports using TypeScript's path mapping.

## Note

This plugin is adapted from
[aleclarson's vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) but ESM only, extremely minified build, and works for Vite v7. The core functionality and documentation are adapted from the original project

## Prerequisites

Before getting started, make sure you have the following tools installed:

- [Bun](https://bun.sh/docs/installation)
- [Moon](https://moonrepo.dev/docs/install)

## Common CLI Commands

Any command ran with moon can be executed from any directory within the monorepo.

### General

```bash
# To install dependencies of the application
bun install

# To update dependencies to their latest version
bun update --latest

# Format your code
moon :format
```

### Demo Web App

```bash
# Build the app
moon demo:build

# Run the app in development mode
moon demo:dev

# Preview the production build
moon demo:preview
```

### `vite-config-paths` Package

```bash
# Build the package
moon vcp:build
```