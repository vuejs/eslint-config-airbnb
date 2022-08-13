const { rules: baseImportsRules } = require('eslint-config-airbnb-base/rules/imports');
const { DEFAULT_RESOLVER_SETTING } = require('../createAliasSetting');

module.exports = {
  settings: {
    'import/resolver': DEFAULT_RESOLVER_SETTING,

    // A list of file extensions that will be parsed as modules and inspected for exports.
    'import/extensions': [
      '.mjs',
      '.js',
      '.jsx',
    ],
  },

  rules: {
    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',

      // All future Vue.js core packages would assume explicit `.vue` extension.
      vue: 'always',
    }],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    // https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v15.0.0/packages/eslint-config-airbnb-base/rules/imports.js#L68
    // The glob syntax here is based on minimatch.
    // Online playground: https://globster.xyz/
    'import/no-extraneous-dependencies': [
      baseImportsRules['import/no-extraneous-dependencies'][0],
      {
        ...baseImportsRules['import/no-extraneous-dependencies'][1],
        devDependencies: [
          ...baseImportsRules['import/no-extraneous-dependencies'][1].devDependencies,
          // Rollup & Vue CLI supports `.cjs` & `.mjs` in addition to `.js`
          '**/rollup.config.*(c|m)js',
          '**/vue.config.*(c|m)js',
          // ESLint supports `.cjs` extension in addition to `.js`
          '**/.eslintrc.*(c)js',

          // Following ones are not included in the base config
          // Vite
          '**/vite.config.*(c|m)js',
          // Vitest
          '**/vitest.config.*(c|m)js',
          // Cypress
          '**/cypress.config.*(c|m)js',
          '**/cypress/support/**',
          '**/*.cy.{js,jsx}',
          // Playwright, only supports `.js` & `.mjs`
          // https://github.com/microsoft/playwright/blob/v1.24.0/packages/playwright-test/src/runner.ts#L52
          '**/playwright.config.*(m)js',
        ],
      },
    ],
  },
};
