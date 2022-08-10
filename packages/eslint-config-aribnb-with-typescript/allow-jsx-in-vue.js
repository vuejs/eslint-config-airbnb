const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: [
    './allow-js-in-vue.cjs',
    './allow-tsx-in-vue.cjs',
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
