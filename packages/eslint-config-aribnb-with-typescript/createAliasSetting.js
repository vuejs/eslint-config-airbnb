/**
 * create an ESLint `settings` object
 * that help configure the import resolver with path mappings in the given tsconfig files.
 * @param {Array<string>} [project] an array of glob patterns,
 * pointing to tsconfig files that contains the "paths" mappings.
 * Defaults to ['tsconfig.json', 'tsconfig.*.json']
 * @returns an object to be spread into `settings` property of ESLint config.
 */
module.exports = function createAliasSetting(
  project = ['**/tsconfig.json', '**/tsconfig.*.json'],
) {
  return {
    'import/resolver': {
      // The Node resolver must come first
      // https://github.com/benmosher/eslint-plugin-import/issues/1396
      // TODO: Not sure if `.mjs` and `.mts` should be included here.
      // Because typically, when we use them in a relative import, we are not using a bundler.
      // When without a bundler, both Node.js and the browser require us to use the full path.
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: [
          '.mts',
          '.ts',
          '.tsx',
          '.mjs',
          '.js',
          '.jsx',
          '.json',
          '.node',
        ],
      },

      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
        // https://github.com/import-js/eslint-import-resolver-typescript#configuration
        project,
      },
    },
  };
};
