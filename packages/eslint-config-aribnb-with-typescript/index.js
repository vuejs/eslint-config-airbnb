const { defineConfig } = require('eslint-define-config');
const upstreamConfig = require('eslint-config-airbnb-typescript/lib/shared');

const tsOverride = upstreamConfig.overrides.find((override) => override.files.includes('*.ts'));
const tsAirbnbRules = tsOverride.rules;

const { rules: baseImportsRules } = require('@vue/eslint-config-airbnb/rules/imports');

const createAliasSetting = require('./createAliasSetting');

module.exports = defineConfig({
  extends: [
    require.resolve('@vue/eslint-config-airbnb'),
    require.resolve('eslint-config-airbnb-typescript'),
  ],

  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),

    project: ['**/tsconfig.json', '**/tsconfig.*.json'],

    // Must be set globally.
    // As far as I've tested, it won't work if set in `overrides`.
    extraFileExtensions: ['.vue'],
  },

  settings: {
    ...createAliasSetting(),

    // A list of file extensions that will be parsed as modules and inspected for exports.
    'import/extensions': ['.mjs', '.js', '.jsx', '.mts', '.ts', '.tsx'],

    'import/parsers': {
      '@typescript-eslint/parser': ['.mts', '.ts', '.tsx', '.d.ts'],
    },
  },

  rules: {
    // Until https://github.com/airbnb/javascript/pull/2623 is merged and released
    'no-spaced-func': 'off',

    // TypeScript compilation already ensures that named imports exist in the referenced module
    // Shouldn't be re-enabled even for `allow-js-in-vue` ruleset because of https://github.com/import-js/eslint-import-resolver-typescript/issues/31
    'import/named': 'off',

    // https://github.com/airbnb/javascript/blob/cbf9ade10a2f6f06c9da6dbfa25b344bee4bbef6/packages/eslint-config-airbnb-base/rules/imports.js#L138-L144
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/91fd090f6fdd8d598a6ac6e9bb2c2ba33014e425/lib/shared.js#L230-L240
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      mts: 'never',
      // Cannot omit `.vue` extensions.
      // This should be enforced all across the Vue.js ecosystem.
      vue: 'always',
    }],

    // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
    'import/no-extraneous-dependencies': [
      baseImportsRules['import/no-extraneous-dependencies'][0],
      {
        ...baseImportsRules['import/no-extraneous-dependencies'][1],
        devDependencies: baseImportsRules[
          'import/no-extraneous-dependencies'
        ][1].devDependencies.reduce((result, devDep) => {
          const toAppend = [devDep];
          const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, 'ts$1');
          if (devDepWithTs !== devDep) {
            toAppend.push(devDepWithTs);
          }
          return [...result, ...toAppend];
        }, []),
      },
    ],

    // only .jsx & .tsx files may have JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

    // TODO: (semver-minor)
    // Disable some unnecessary jsx rules that can be covered by TypeScript
    // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/273
  },

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/block-lang': [
          'error',
          {
            script: {
              // Only `<script lang="ts">` is allowed.
              // `<script>` needs to be opted-in via the `allow-js-in-vue` ruleset.
              // `<script lang="jsx">` and `<script lang="tsx">` need to be opted-in
              // via the `allow-jsx-in-vue`/`allow-tsx-in-vue` rulesets.
              // See the reasoning in the corresponding files.
              lang: 'ts',
              allowNoLang: false,
            },
          },
        ],

        // apply the overrides of `.ts` to `.vue`, too
        ...tsAirbnbRules,
      },
    },

    // Some config files can only be written in JS.
    // But this config is expected to be used in a TypeScript-only environment by default.
    // We don't expect these JS config files to be included in any TypeScript projects
    // (i.e. `tsconfig.json`s).
    // So we add the following rule,
    // to avoid the error "The file must be included in at least one of the projects provided",
    {
      files: ['.eslintrc.*js', 'babel.config.*js', 'vue.config.*js'],
      parser: 'espree',
      env: {
        node: true,
      },
    },

    // These are necessary triple-slash directives
    {
      files: ['cypress/support/commands.ts', 'env.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': [
          'error',
          {
            types: 'always',
          },
        ],
      },
    },
  ],
});
