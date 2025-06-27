# vite-tsconfig-paths

Give [`vite`] the ability to resolve imports using TypeScript's path mapping.

[`vite`]: https://github.com/vitejs/vite

```sh
bun add -d @plugwalk/vite-tsconfig-paths
```

## Setup

1. Ensure the project either has `"type": "module"` set or that the Vite config is renamed to `vite.config.mjs` / `vite.config.mts` depending on whether TypeScript is used

2. Inject `@plugwalkvite-tsconfig-paths` in the Vite config

   ```ts
   import tsconfigPaths from '@plugwalk/vite-tsconfig-paths'
   import { defineConfig } from 'vite'

   export default defineConfig({
     plugins: [tsconfigPaths()],
   })
   ```

### ⚠️ CSS imports are not supported.

Due to a Vite limitation, CSS files (and CSS dialects) cannot be resolved with this plugin.

### ⚠️ Non-TypeScript modules need special configuration.

To enable path resolution in non-TypeScript modules (e.g. `.vue`, `.svelte`, `.mdx`), you must set the `allowJs` option to true in your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

**Alternative:** If you prefer to avoid `allowJs` or it didn't help, passing `loose: true` to the plugin constructor should work.

```ts
tsconfigPaths({ loose: true })
```

## Plugin Options

You pass these options when calling the plugin constructor in your Vite config.

> [!WARNING]
> You should try using the plugin without *any* of these options, and only set them when you know you need them.

```ts
import tsconfigPaths from '@plugwalk/vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tsconfigPaths({ /* options go here */ })],
})
```

#### `projectDiscovery: "eager" | "lazy"`

Control how tsconfig files are discovered and loaded. By default, `"eager"` is used, which means your Vite project is scanned for tsconfig files when the plugin is initialized, and never again after that. The `root` option only works in eager mode.

When `"lazy"` is used, tsconfig files are only scanned when an import is encountered in a module with a supported file extension that exists in the same directory as the `tsconfig.json` file (or one of its subdirectories). In other words, importers with a `tsconfig.json` or `jsconfig.json` file in one of their parent directories will have their imports resolved by this plugin.

#### `root: string`

The directory to search for `tsconfig.json` files.

The default value of this option depends on whether `projects` is defined. If it is, then the [Vite project root](https://vitejs.dev/config/shared-options.html#root) is used. Otherwise, Vite's [`searchForWorkspaceRoot`](https://vitejs.dev/guide/api-javascript.html#searchforworkspaceroot) function is used.

#### `projects: string[]`

If you have an esoteric setup, you _might_ need this option to specify where your tsconfig files are located. The paths within are relative to the `root` option.

If defined, the `root` directory won't be searched for tsconfig files. You should **always** try using just the `root` option first, because this option is more brittle.

#### `loose: boolean`

Disable strictness that limits path resolution to TypeScript and JavaScript importers. In other words, when `loose: true` is used, any file that gets transpiled into JavaScript will have its imports resolved by this plugin.

For example, this is useful if you want imports in Vue templates to be resolved, but don't want to use `allowJs` in your tsconfig.

#### `parseNative: boolean`

Enable use of the [`tsconfck.parseNative`](https://github.com/dominikg/tsconfck/blob/main/docs/api.md#parsenative) function, which delegates the loading of tsconfig files to the TypeScript compiler. You'll probably never need this, but I added it just in case.

> [!WARNING]
> This option can slow down Vite's startup time by as much as 600ms, due to the size of the TypeScript compiler. Only use it when necessary.

#### `ignoreConfigErrors: boolean`

When true, parsing errors encountered while loading tsconfig files will be ignored.

This is useful if you have a monorepo with multiple tsconfig files, and you don't want to see errors for the ones that aren't relevant to the current project.

#### `skip: (dir: string) => boolean`

A function that determines which directories to skip when searching for tsconfig.json files.

While `.git` and `node_modules` directories are always skipped, this option allows you to skip additional directories, which is useful in large monorepos to improve performance.

## TSConfig Options

### allowJs

If your tsconfig file has `"allowJs": true` in it, path resolution will be expanded beyond TypeScript importers. The following extensions will have their imports resolved by this plugin: `.vue`, `.svelte`, `.mdx`, `.mjs`, `.js`, `.jsx`

If you believe another file extension should be supported by default, please open an issue or pull request.

### baseUrl

If the `baseUrl` is defined, it gets prepended to all bare imports, and its resolution will take precedence over node_modules. This is also how TypeScript does it.

Say the `baseUrl` is `../root` and you import `react`. This plugin will use `../root/react` if it exists. If not found, then `react` is resolved normally. The `baseUrl` is relative to the project root (where `tsconfig.json` lives).


### include/exclude

The `include` and `exclude` tsconfig options are respected.

Internally, [globrex](https://github.com/terkelg/globrex) is used for glob matching.