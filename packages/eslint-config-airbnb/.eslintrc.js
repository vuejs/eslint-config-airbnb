module.exports = {
  extends: [
    require.resolve('eslint-config-airbnb-base'),
    require.resolve('./rules/imports.js'),
    // require.resolve('./rules/jsx.js'),
    require.resolve('./rules/jsx-a11y.js'),
    // require.resolve('./rules/template.js'),
    require.resolve('./rules/template-a11y.js'),
  ],
  rules: {
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],

    // FIXME:
    // I think we should allow for-of
    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb-base/rules/style.js#L331-L351
  },
};
