# `@vue/eslint-config-airbnb-with-typescript`

> eslint-config-airbnb-with-typescript for Vue

This config is specifically designed to be used by `@vue/cli` & `create-vue` setups
and is not meant for outside use (it can be used but some adaptations
on the user side might be needed - for details see the config file).

A part of its design is that this config may implicitly depend on
other parts of `@vue/cli`/`create-vue` setups, such as `eslint-plugin-vue` being
extended in the same resulting config.

## Installation

In order to work around [a known limitation in ESLint](https://github.com/eslint/eslint/issues/3458), we recommend you to use this package alongside `@rushstack/eslint-patch`, so that you don't have to install too many dependencies:

```sh
npm add --dev @vue/eslint-config-airbnb-with-typescript @rushstack/eslint-patch
```

## Usage

An example `.eslintrc.cjs`:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extens: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript'
  ]
}
```

## Aliases

This ruleset automatically reads the [TypeScript path mappings](https://www.typescriptlang.org/tsconfig#paths) from `**/tsconfig.json` and `**/tsconfig.*.json` files in the project. You don't need any additional configuration to set up aliases.
If your TSConfig files are in a different location, please refer to the [Non-Conventional TSConfig Locations](#non-conventional-tsconfig-locations) section.

## JS Support in `.vue` Files

By default this ruleset only allows using `<script lang="ts">` (and `<script setup lang="ts">`) in `.vue` files.

If you need to use plain `<script>` in `.vue` files:

1. First, set `compilerOptions.allowJs` to `true` in your TSConfig.
2. Then, append the `allow-js-in-vue` ruleset to your `.eslintrc.cjs`:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extens: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript'
    '@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue'
  ]
}
```

If you encounter any `no-undef` errors when using global variables/functions, please configure [the `env` option for ESLint](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments).

## TSX/JSX Support in `.vue` Files

There's a limitation in `@typescript-eslint/parser` that it cannot parse JSX syntaxes in `.vue` files *when `parserOptions.project` is set*.

So, by default, we disallow `<script lang="tsx">` and `<script lang="jsx">` in `.vue` files.
You can use JSX syntax in standalone `.tsx` and `.jsx` files instead.

If you do need to use `<script lang="tsx">` or `<script lang="jsx">` in your `.vue` files, you can apply the `allow-tsx-in-vue`/`allow-jsx-in-vue` config to all `.vue` files to disable those rules that require type informations (e.g., `no-floating-promises`):

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-tsx-in-vue'
  ]
}
```

Turning on `allow-jsx-in-vue` would allow both `<script lang="tsx">` and `<script lang="jsx">`, and requiring a carefully configured `env` field as aforementioned in the JS support section:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-jsx-in-vue'
  ]
}
```

Note that doing so would catch fewer errors.

## Non-Conventional TSConfig Locations

By default, this ruleset searches for TSConfig files matching `**/tsconfig.json` and `**/tsconfig.*.json` from the current working directory.
This should cover most use cases.

However, if your TSConfig file is located somewhere else (e.g., in an ancestor directory), or doesn't follow the conventional naming (e.g., named as `my-custom-tsconfig.json`), you need to specify the location in your `.eslintrc.cjs` manually:

```js
require("@rushstack/eslint-patch/modern-module-resolution")
const createAliasSetting = require('@vue/eslint-config-airbnb-with-typescript/createAliasSetting')

module.exports = {
  root: true,
  extens: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript'
  ],
  parserOptions: {
    project: ['/path/to/my-custom-tsconfig.json']
  },
  settings: {
    ...createAliasSetting(['/path/to/my-custom-tsconfig.json'])
  }
}
```

## `Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.`

If you are using this config in an existing project, you may encounter this error:

```text
Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: foo.js.
The file must be included in at least one of the projects provided
```

It is likely because your existing `tsconfig.json` does not include all of the files you would like to lint.

(This doesn't usually happen in projects created by [`create-vue`](https://github.com/vuejs/create-vue) because it creates projects with [solution-style `tsconfig.json` files](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#support-for-solution-style-tsconfigjson-files) that cover every file in the project.)

A workaround is to create a separate `tsconfig.eslint.json` as follows:

```json
{
  // Extend your base config so you don't have to redefine your compilerOptions
  "extends": "./tsconfig.json",
  "include": [
    // Include all files in the project
    "./**/*",
    // By default the `include` glob pattern doesn't match `.vue` files, so we add it explicitly
    "./**/*.vue"
  ],
  "compilerOptions": {
    // Include `.js` & `.jsx` extensions
    "allowJs": true
  }
}
```

## IE 11 support

IE 11 reached End-of-Life on June 15, 2022, so this configuration doesn't include any rules that are specific to IE 11.

If your project still has to support IE 11, we recommend you to add the following 2 rules to your config:

```js
module.exports = {
   // ...

   rules: {
    // Enforce `rel="noopener noreferrer"` on external links in `<template>`
    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': 'error',
    // Enforce `rel="noopener noreferrer"` on external links in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': 'error',
   }
}
```

## Further Improvements

It seems possible to lift the TSX/JSX restriction in `.vue` files without disabling the type-aware linting rules.
[`@typescript-eslint/parser` allows passing `program` instance](https://github.com/typescript-eslint/typescript-eslint/tree/v5.30.7/packages/parser#parseroptionsprograms) to override any programs that would have been computed from `parserOptions.project`.
If we provide a `program` created by [Volar](https://github.com/johnsoncodehk/volar), maybe it can have better support for `.vue` files?
I haven't yet got the time to try it out.
