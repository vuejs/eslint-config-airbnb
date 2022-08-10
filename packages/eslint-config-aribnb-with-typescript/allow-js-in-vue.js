const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // In the `-with-typescript` ruleset,
        // some rules are turned off because TypeScript can handle those case (e.g. `no-undef`).
        // But these rules won't apply to `<script>` blocks in `.vue` files
        // (because they are parsed by `espree`).
        // So if we allow `<script>` blocks in `.vue` files, we need to re-enable these rules.
        // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/v17.0.0/lib/shared.js#L264-L291
        'constructor-super': 'error',
        'getter-return': ['error', { allowImplicit: true }],
        'no-const-assign': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-func-assign': 'error',
        'no-import-assign': 'error',
        'no-new-symbol': 'error',
        'no-obj-calls': 'error',
        'no-redeclare': 'error',
        'no-setter-return': 'error',
        'no-this-before-super': 'error',
        'no-undef': 'error',
        'no-unreachable': 'error',
        'no-unsafe-negation': 'error',
        'valid-typeof': ['error', { requireStringLiterals: true }],
        // I choose to not re-enable `import/no-unresolved`
        // https://github.com/iamturns/eslint-config-airbnb-typescript/tree/v17.0.0#why-is-importno-unresolved-disabled
        // Because I didn't see much value, either.
        // I don't want to deal with the potential issues caused by it.

        // Allow `<script>` & `<script lang="ts">`, but not other langs.
        'vue/block-lang': [
          'error', {
            script: {
              lang: 'ts',
              allowNoLang: true,
            },
          },
        ],
      },
    },
  ],
});
