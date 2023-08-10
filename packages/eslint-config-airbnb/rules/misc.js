// These are some corresponding rules to those in
// https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js
// that can't be categorized as either jsx- or template-specific rules.
module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  plugins: ['vue'],
  rules: {
    // https://eslint.vuejs.org/rules/require-default-prop.html
    // Corresponding to the `react/require-default-props` rule
    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb/rules/react.js#L390-L394
    'vue/require-default-prop': 'error',

    // https://eslint.vuejs.org/rules/no-potential-component-option-typo.html
    // Corresponding to `react/no-typos` but a little bit different.
    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb/rules/react.js#L426-L428
    'vue/no-potential-component-option-typo': 'error',
  },
};
