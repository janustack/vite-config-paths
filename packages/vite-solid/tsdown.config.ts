import { defineConfig } from 'tsdown';

const extensions = ['.js', '.ts', '.json', '.tsx', '.jsx'];

export default defineConfig({
  dts: true,
  entry: 'src/index.ts',
  exports: true,
  external: [
    '@babel/core',
    '@babel/preset-typescript',
    'babel-preset-solid',
    'solid-refresh',
    'solid-refresh/babel',
    'merge-anything',
    'vitefu',
    'vite'
  ],
  sourcemap: 'inline',
  plugins: [
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
    }),
    nodeResolve({ extensions, preferBuiltins: true, browser: false }),
  ],
});