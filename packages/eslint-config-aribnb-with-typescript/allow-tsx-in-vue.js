const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  overrides: [
    {
      files: ['*.vue'],
      parserOptions: {
        // Note: only `null` can override the previous config. `undefined` would be ignored.
        project: null,

        // Use `espree` for js/jsx script blocks to get better performance.
        // Note this format can only be used when there's no `project` set.
        parser: {
          js: 'espree',
          jsx: 'espree',

          ts: require.resolve('@typescript-eslint/parser'),
          tsx: require.resolve('@typescript-eslint/parser'),

          // Leave the template parser unspecified,
          // so that it could be determined by `<script lang="...">`.
        },
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },

      rules: {
        // Allow `<script lang="ts">` & `<script lang="tsx">`, but not other langs.
        'vue/block-lang': [
          'error', {
            script: {
              lang: ['ts', 'tsx'],
              allowNoLang: false,
            },
          },
        ],

        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.vue'] }],

        // Don't apply those rules that need type information for `.vue` files.
        // Because it's not supported for `script lang="tsx"` in `.vue` files yet.
        // We need to use the JS version of them (if available) instead.
        // https://github.com/vuejs/create-vue/issues/123#issuecomment-1189934982
        // That includes (as of eslint-config-airbnb-typescript@v17.0.0 ):
        '@typescript-eslint/naming-convention': 'off',
        camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],

        '@typescript-eslint/dot-notation': 'off',
        'dot-notation': ['error', { allowKeywords: true }],

        'no-implied-eval': 'error',
        'no-new-func': 'error',
        '@typescript-eslint/no-implied-eval': 'off',

        'no-throw-literal': 'error',
        '@typescript-eslint/no-throw-literal': 'off',

        '@typescript-eslint/require-await': 'off',

        '@typescript-eslint/return-await': 'off',
        'no-return-await': 'error',
      },
    },
  ],
});
