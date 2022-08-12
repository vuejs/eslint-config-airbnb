const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: [
    require.resolve('./allow-js-in-vue'),
    require.resolve('./allow-tsx-in-vue'),
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/block-lang': [
          'error', {
            script: {
              lang: ['jsx', 'ts', 'tsx'],
              allowNoLang: true,
            },
          },
        ],
      },
    },
  ],
});
