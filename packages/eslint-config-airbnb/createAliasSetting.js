const DEFAULT_RESOLVER_SETTING = {
  // https://github.com/benmosher/eslint-plugin-import/issues/1396
  // The default config is good enough, so just an empty object here
  [require.resolve('eslint-import-resolver-node')]: {},
};

/**
 * create an ESLint `settings` object
 * that help configure the import resolver with given aliases.
 * @param {Object} alias a key-value pair, key is the alias prefix,
 * value is the actual path. Note it's neither glob nor regex.
 * @returns an object to be spread into `settings` property of ESLint config.
 */
module.exports = function createAliasSetting(alias) {
  return {
    'import/resolver': {
      ...DEFAULT_RESOLVER_SETTING,
      [require.resolve('eslint-import-resolver-custom-alias')]: {
        alias,
        extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
      },
    },
  };
};

module.exports.DEFAULT_RESOLVER_SETTING = DEFAULT_RESOLVER_SETTING;
