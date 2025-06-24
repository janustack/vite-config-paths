import { defineConfig } from 'rolldown';

import cleaner from 'rollup-plugin-cleaner';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.ts', '.json', '.tsx', '.jsx'];

const external = [
  '@babel/core',
  '@babel/preset-typescript',
  'babel-preset-solid',
  'solid-refresh',
  'solid-refresh/babel',
  'merge-anything',
  'vitefu',
  'vite'
];


export default defineConfig({
  input: 'index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/index.js',
      sourcemap: true,
    },
  ],
  footer: {
    text: "Made with ❤️ by ACY at Janustack",
  },
  external,
  plugins: [
    cleaner({ targets: ['./dist/'] }),
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