// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { globSync } from 'glob';
import path from 'path';

// Get all component files
const componentFiles = globSync('src/components/**/*.{ts,tsx}');

// Create an entry point object for each component
const componentEntries = componentFiles.reduce((entries, file) => {
  const name = path.basename(file, path.extname(file));
  const dir = path.dirname(file).replace('src/', '');
  entries[`${dir}/${name}`] = file;
  return entries;
}, {});

// Add the main entry point
componentEntries['index'] = 'src/index.ts';

export default [
  // Component bundle configuration
  {
    input: componentEntries,
    output: [
      {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(), // Automatically externalize peer dependencies
      resolve(), // Locate modules using the Node resolution algorithm
      commonjs(), // Convert CommonJS modules to ES6
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
      postcss({
        // Don't extract CSS in this configuration - components only
        inject: false,
        use: ['sass', 'less'],
        config: {
          path: './postcss.config.js',
        },
      }),
      terser(), // Minify the bundle
    ],
    external: ['react', 'react-dom'],
  },
  // CSS only bundle
  {
    input: 'src/styles/index.css',
    output: {
      file: 'dist/styles.css',
      format: 'es',
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        use: ['sass', 'less'],
        config: {
          path: './postcss.config.js',
        },
      }),
    ],
  },
];