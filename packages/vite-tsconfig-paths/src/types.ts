import type { TSConfckParseNativeResult, TSConfckParseResult } from 'tsconfck'
import type { CompilerOptions, ParsedCommandLine } from 'typescript'
import { NormalizedPath } from './path'

export interface PluginOptions {
  /**
   * The directory to crawl for `tsconfig.json` files.
   *
   * When the `projects` option is set, crawling is skipped, so this is
   * used to resolve `projects` paths into absolute paths instead.
   *
   * @default
   * // The config root is used for resolving project paths, and the
   * // workspace root is used for crawling.
   * options.projects ? viteConfig.root : vite.searchForWorkspaceRoot(viteConfig.root)
   */
  root?: string
  /**
   * An array of `.json` files and/or directories that contain a
   * `tsconfig.json` file. These JSON files must adhere to the
   * {@link https://www.typescriptlang.org/tsconfig TypeScript config interface}.
   * The `extends` property is supported.
   *
   * This disables crawling for `tsconfig.json` files when defined.
   *
   * **Note:** When using `projectDiscovery: "lazy"`, this option is perfect
   * for ensuring your
   * {@link https://www.typescriptlang.org/docs/handbook/project-references.html project references}
   * are discovered.
   */
  projects?: string[]
  /**
   * Disable strictness that limits path resolution to TypeScript and
   * JavaScript modules.
   *
   * Useful if you want asset URLs in Vue templates to be resolved, or when
   * `"allowJs": true` in your tsconfig isn't good enough.
   */
  loose?: boolean
  /**
   * Enable use of `tsconfck.parseNative` function, which delegates the
   * loading of `tsconfig.json` files to the TypeScript compiler. You'll
   * probably never need this, but I added it just in case.
   *
   * ⚠️ This option can slow down Vite's startup time by as much as 600ms,
   * due to the size of the TypeScript compiler. Only use it when
   * necessary.
   */
  parseNative?: boolean
  /**
   * Silence the warning about malformed `tsconfig.json` files.
   */
  ignoreConfigErrors?: boolean
  /**
   * An array of `tsconfig.json` file names to search for.
   *
   * @default ["tsconfig.json", "jsconfig.json"]
   */
  configNames?: string[]
  /**
   * A function that determines which directories to skip when searching
   * for tsconfig.json files. While `.git` and `node_modules` directories
   * are always skipped, this option allows you to skip additional
   * directories, which is useful in large monorepos to improve
   * performance.
   *
   * **Note:** This is not used when the `projects` option is set, unless
   * `projectDiscovery` is set to `lazy`.
   */
  skip?: (dir: string) => boolean
  /**
   * With the "lazy" strategy, the `tsconfig.json` files are parsed when an
   * import is encountered in a module with a supported file extension that
   * exists in the same directory as the `tsconfig.json` file (or one of
   * its subdirectories).
   *
   * **Note 1:** If your `tsconfig.json` files have `../*` paths in their
   * `include` or `files` array, the "lazy" strategy is not recommended,
   * since the tsconfig file won't be discovered for those cases.
   *
   * **Note 2:** You can combine the `projects` option with "lazy" to
   * ensure your project references are discovered. Alternatively, the
   * `configNames` option allows for custom-named tsconfig files to be
   * discovered.
   *
   * With the "eager" strategy, all `tsconfig.json` files are loaded and
   * parsed when the plugin is initialized. This means they won't be
   * reloaded if their file is edited. This was the only parsing strategy
   * prior to v5.2.0 and may be deprecated in a future version.
   *
   * @default "eager"
   */
  projectDiscovery?: 'eager' | 'lazy'
  /**
   * A file to write detailed logs of the resolver process.
   */
  logFile?: string | boolean
}

type Merge<T, U> = Omit<T, keyof U> & U

/**
 * An object representing a `tsconfig.json` file.
 *
 * Created by `tsconfck` so we shouldn't add properties to it.
 */
export type Project = Merge<
  TSConfckParseResult | TSConfckParseNativeResult,
  {
    extended?: Project[]
    referenced?: Project[]
    tsconfigFile: NormalizedPath
    tsconfig: {
      files?: string[]
      include?: string[]
      exclude?: string[]
      compilerOptions?: CompilerOptions
    }
    result?: ParsedCommandLine
  }
>

export type ViteResolve = (
  id: string,
  importer: string
) => Promise<string | undefined>

export type Resolver = (
  viteResolve: ViteResolve,
  id: string,
  importer: string
) => Promise<readonly [resolved: string | undefined, matched: boolean]>

export type Directory = {
  /** May contain eager-loaded and lazy-loaded projects. */
  projects: Project[]
  /**
   * A promise that resolves after the directory is scanned for tsconfig
   * files and any found tsconfig files are parsed.
   */
  lazyDiscovery: Promise<void> | false | null
}
