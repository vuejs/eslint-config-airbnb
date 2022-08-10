module.exports = {
  extends: [
    require.resolve('eslint-config-airbnb-base'),

    require.resolve('./rules/imports.js'),

    require.resolve('./rules/jsx.js'),
    require.resolve('./rules/jsx-a11y.js'),

    require.resolve('./rules/template.js'),
    require.resolve('./rules/template-a11y.js'),

    require.resolve('./rules/misc.js'),
  ],

  parserOptions: {
    // Should be at least 2022 to support top-level await in `<script setup>`
    // https://eslint.vuejs.org/user-guide/#using-eslint-v8-x
    ecmaVersion: 'latest',
  },

  rules: {
    // rule: https://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex/pinia state
        'acc', // for reduce accumulators
        'accumulator', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'context', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
        'staticContext', // for ReactRouter context
      ],
    }],

    // TODO: (semver-minor)
    // I think we should allow for-of
    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb-base/rules/style.js#L331-L351
    // But it is really slow, even in modern browsers: https://bugs.chromium.org/p/v8/issues/detail?id=13157
  },
};
