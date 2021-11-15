const importResolver = {
  // https://github.com/benmosher/eslint-plugin-import/issues/1396
  [require.resolve('eslint-import-resolver-node')]: {},
};

try {
  const vueCliConfig = require.resolve('@vue/cli-service/webpack.config.js');
  importResolver[require.resolve('eslint-import-resolver-webpack')] = {
    config: vueCliConfig,
  };
} catch (e) {
  // ignore
}

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vuejs-accessibility/recommended',
  ],
  settings: {
    'import/resolver': importResolver,
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs', // ?
      '.ts',
      '.tsx',
    ],
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],

    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/97
    'vuejs-accessibility/no-onchange': 'off',

    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
  },
};
