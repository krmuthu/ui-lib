// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { glob } from 'glob';
import path from 'path';

// CSS extraction
const cssPlugin = postcss({
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer(),
  ],
  extract: 'styles.css',
  minimize: true,
  sourceMap: true,
});

// Get all component files
const components = glob.sync('src/components/**/*.{ts,tsx}').map(file => {
  // Create path relative to src/components
  const name = path.relative('src/components', file).replace(/\.\w+$/, '');
  return {
    name,
    file,
    // Convert path/to/component to path-to-component
    outputName: name.replace(/\//g, '-'),
  };
});

// Common plugins to use for all builds
const commonPlugins = [
  // Automatically externalize peer dependencies
  peerDepsExternal(), 
  
  // Resolve node modules
  resolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  
  // Convert CommonJS modules to ES6
  commonjs(),
  
  // TypeScript support
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist/types',
    sourceMap: true,
  }),
  
  // Babel for modern JS features
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
];

// Create the bundle configuration
export default [
  // Main bundle configuration - processes and extracts CSS
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins,
      cssPlugin,
      terser(),
    ],
    external: ['react', 'react-dom'],
  },
  
  // Individual component builds (without CSS extraction)
  ...components.map(component => ({
    input: component.file,
    output: [
      {
        file: `dist/components/${component.outputName}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `dist/components/${component.outputName}.esm.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins,
      // Include PostCSS but don't extract in component builds
      postcss({
        plugins: [
          tailwindcss('./tailwind.config.js'),
          autoprefixer(),
        ],
        // Don't extract CSS in component builds
        inject: false,
        // Just process the CSS for Tailwind classes
        sourceMap: true,
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  })),
];