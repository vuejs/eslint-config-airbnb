module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'vue'],

  rules: {
    // Disallow target="_blank" on links
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': ['error', {
      allowReferrer: false,
      enforceDynamicLinks: 'always',
    }],

    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': ['error', {
      allowReferrer: false,
      enforceDynamicLinks: 'always',
    }],
  },
};
