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
  },
};
