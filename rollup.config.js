// @ts-check
import addGitMsg from 'rollup-plugin-add-git-msg'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

import pkg from './package.json'


// List of njs built-in modules.
const njsExternals = ['crypto', 'fs', 'querystring']
const isEnvProd = process.env.NODE_ENV === 'production'

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: 'src/index.ts',
  external: njsExternals,
  plugins: [
    // Transpile TypeScript sources to JS.
    babel({
      babelHelpers: 'bundled',
      envName: 'njs',
      extensions: ['.ts', '.mjs', '.js'],
    }),
    // Resolve node modules.
    resolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    // Convert CommonJS modules to ES6 modules.
    commonjs(),
    // Plugins to use in production mode only.
    ...isEnvProd ? [
      // Add git tag, commit SHA, build date and copyright at top of the file.
      addGitMsg(),
    ] : [],
  ],
  output: {
    file: pkg.main,
    format: 'es',
  },
}
export default options
